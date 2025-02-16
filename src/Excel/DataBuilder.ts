/* eslint-disable max-len */
import TestConstants from '@uiConstants/TestConstants';
import * as XLSX from 'xlsx';
import { Attribute, Folder, DocumentClass } from './types';

export default class DataBuilder {
  private foldersMap: Map<string, Folder> = new Map();

  // Public properties to store the results
  public defaultFolder = "";
  public defaultDocument = "";
  public defaultDocumentEntryTemplate = "";
  public mandatoryAttributesByDocumentType: Map<string, Attribute[]> = new Map();
  public allAttributesByDocumentType: Map<string, Attribute[]> = new Map();
  public folderPath: string[] = [];

  constructor() {
    const filePath = TestConstants.PROJECT_FILE;
    this.readExcelFileAndBuildMap(filePath);
    this.defaultFolder = this.getDefaultFolder(); // Get default folder when instantiated
    this.defaultDocument = this.getDefaultDocument();
    this.defaultDocumentEntryTemplate = this.getDefaultDocumentEntryTemplate(); // Get default document when instantiated
  }

  // Method to read the Excel file and populate foldersMap
  private readExcelFileAndBuildMap(filePath: string): void {
    const workbook = XLSX.readFile(filePath);

    // Read folder structure
    const folderSheet = workbook.Sheets['Folder structure'];
    const folderData = XLSX.utils.sheet_to_json<any>(folderSheet);

    // Read document types
    const documentSheet = workbook.Sheets['Document Types'];
    const documentData = XLSX.utils.sheet_to_json<any>(documentSheet);

    // Read attributes
    const attributeSheet = workbook.Sheets['Attributes Sheet'];
    const attributeData = XLSX.utils.sheet_to_json<any>(attributeSheet);

    this.processFolders(folderData);
    this.processDocumentTypes(documentData);
    this.processAttributes(attributeData);
  }

  private processFolders(folderData: any[]): void {
    const folderChildrenMap: Map<string, { [key: string]: Folder }> = new Map();

    folderData.forEach((row: any) => {
      const folderName = row['Folder name'];
      const parentFolder = row['Parent Folder'];
      const canAdd = row.CanAdd === 'Y';
      const isDefault = row.Default === 'Y'; // Read 'Default' column

      const folder: Folder = {
        name: folderName,
        parent: parentFolder === 'Root folder' ? null : parentFolder,
        children: {},
        documents: [],
        canAdd: canAdd,
        isDefault: isDefault, // Store default status
      };

      this.foldersMap.set(folderName, folder);

      if (parentFolder !== 'Root folder') {
        if (!folderChildrenMap.has(parentFolder)) {
          folderChildrenMap.set(parentFolder, {});
        }
        const parentFolderChildren = folderChildrenMap.get(parentFolder);
        if (parentFolderChildren) {
          parentFolderChildren[folderName] = folder;
        }
      }
    });

    this.assignChildrenToParentFolders(folderChildrenMap);
  }

  private assignChildrenToParentFolders(folderChildrenMap: Map<string, { [key: string]: Folder }>): void {
    folderChildrenMap.forEach((children, parentName) => {
      const parentFolder = this.foldersMap.get(parentName);
      if (parentFolder) {
        parentFolder.children = children;
      }
    });
  }

  private processDocumentTypes(documentData: any[]): void {
    documentData.forEach((row: any) => {
      const folderName = row['Folder name'];
      const documentType = row['Document type'];
      const isDefault = row.Default === 'Y'; // Read 'Default' column
      const entryTemplate = row['Entry template'] || ''; // Read 'Entry template' column

      const folder = this.foldersMap.get(folderName);

      if (folder) {
        const document: DocumentClass = {
          documentType: documentType,
          folderName: folderName,
          attributes: [],
          isDefault: isDefault, // Store default status
          entryTemplate: entryTemplate, // Store entry template status
        };
        folder.documents.push(document);
      }
    });
  }

  private processAttributes(attributeData: any[]): void {
    attributeData.forEach((row: any) => {
      const documentType = row['Document type'];
      this.foldersMap.forEach((folder) => {
        folder.documents.forEach((doc) => {
          if (doc.documentType === documentType) {
            const attribute: Attribute = {
              attributeName: row['Attribute name'],
              attributeType: row['Attribute Type'],
              mandatory: row.Mandatory === 'Y',
              maxLength: row['Max Length'] ? parseInt(row['Max Length'], 10) : undefined,
              listValues: row['List values'] ? row['List values'].split(',') : undefined,
              validationError: row['Validation error'] || '', // Read the validation error column
              futureDate: row['Future date'] !== 'N', // Interpret 'N' as false, anything else as true
              dependant: row.Dependant || '', // Read the 'Dependant' column and store the value
              defaultValue: row['Default value'] || '', // Read the 'Default value' column and store the value
            };
            doc.attributes.push(attribute);
          }
        });
      });
    });
  }

  // Method to get the folder name with "Default" marked as 'Y'
  public getDefaultFolder(): string {
    const defaultFolder = Array.from(this.foldersMap.values()).find((folder) => folder.isDefault);
    return defaultFolder ? defaultFolder.name : ""; // Return the folder name as a string or empty if not found
  }

  // Method to get the document type with "Default" marked as 'Y'
  public getDefaultDocument(): string {
    const defaultDocument = Array.from(this.foldersMap.values())
      .flatMap((folder) => folder.documents)
      .find((document) => document.isDefault);
    return defaultDocument ? defaultDocument.documentType : ""; // Return the document type as a string or empty if not found
  }

  public getDefaultDocumentEntryTemplate(): string {
    const defaultDocument = Array.from(this.foldersMap.values())
      .flatMap((folder) => folder.documents)
      .find((document) => document.isDefault);
    return defaultDocument ? defaultDocument.entryTemplate : ""; // Return the entry template or empty if not found
  }

  // Method to get mandatory attributes for a document type
  public getMandatoryAttributes(documentType: string): Attribute[] {
    if (!this.mandatoryAttributesByDocumentType.has(documentType)) {
      const attributes: Attribute[] = [];
      this.foldersMap.forEach((folder) => {
        folder.documents.forEach((doc) => {
          if (doc.documentType === documentType) {
            doc.attributes.forEach((attr) => {
              if (attr.mandatory) {
                attributes.push(attr);
              }
            });
          }
        });
      });
      this.mandatoryAttributesByDocumentType.set(documentType, attributes); // Store in map
    }
    const attributes = this.mandatoryAttributesByDocumentType.get(documentType);
    return attributes || [];
  }

  // Method to get the children of a specified folder
  public getChildren(folderName: string): { [key: string]: Folder } | undefined {
    const folder = this.foldersMap.get(folderName);
    return folder?.children;
  }

  public getFoldersMap(): Map<string, Folder> {
    return this.foldersMap;
  }

  // Method to extract list attribute values for a specific document type and attribute
  public extractListAttributeValues(
    documentType: string,
    attributeName: string, // Add attribute name as a parameter
  ): string[] {
    const listValues: string[] = [];
    const foldersMap = this.getFoldersMap(); // Use getFoldersMap to get the folders map
    foldersMap.forEach((folder) => {
      folder.documents.forEach((doc) => {
        if (doc.documentType === documentType) { // Check if document type matches
          doc.attributes.forEach((attr) => {
            // Check if attribute matches and is of type 'List' or 'Approval', and has list values
            if (attr.attributeName === attributeName && (attr.attributeType === 'List' || attr.attributeType === 'Approval') && attr.listValues) {
              listValues.push(...attr.listValues); // Add list values to the result array
            }
          });
        }
      });
    });
    return listValues; // Return the collected list values for the specified attribute
  }

  // Method to get the hierarchy of parent folders for a given folder name
  public getFolderPath(folderName: string): string[] {
    let currentFolder = this.foldersMap.get(folderName);

    while (currentFolder && currentFolder.name !== 'Root folder') {
      this.folderPath.unshift(currentFolder.name); // Add the current folder name at the beginning
      currentFolder = this.foldersMap.get(currentFolder.parent);
    }

    this.folderPath.push(folderName); // Add the passed folder name at the end
    return this.folderPath;
  }

  // Method to get the root folder name
  public getRootFolderName(): string {
    const rootFolder = Array.from(this.foldersMap.values()).find((folder) => folder.parent === null);
    return rootFolder ? rootFolder.name : ""; // Return the root folder name or empty if not found
  }

  public getLowLevelFolders(): string[] {
    return Array.from(this.foldersMap.values())
      .filter((folder) => folder.parent && folder.parent !== 'Root folder')
      .map((folder) => folder.name);
  }

  // Method to get all document types
  public getAllDocumentTypes(): DocumentClass[] {
    const documentTypes: DocumentClass[] = [];
    this.foldersMap.forEach((folder) => {
      folder.documents.forEach((doc) => {
        documentTypes.push(doc);
      });
    });
    return documentTypes;
  }

  // Method to check if a document type has an entry template
  public hasEntryTemplate(documentType: string): string {
    const document = Array.from(this.foldersMap.values())
      .flatMap((folder) => folder.documents)
      .find((doc) => doc.documentType === documentType);
    return document.entryTemplate; 
  }

  // Method to get the entry template for a given document type
  public getEntryTemplateByDocumentType(documentType: string): string {
    const document = Array.from(this.foldersMap.values())
      .flatMap((folder) => folder.documents)
      .find((doc) => doc.documentType === documentType);
    return document ? document.entryTemplate : ""; // Return the entry template or empty if not found
  }

  // Method to get all attribute names for a given document class
  public getAttributeByDocumentClass(documentClass: DocumentClass): Attribute[] {
    return documentClass.attributes;
  }

  public getAttributeNameByDocumentClass(documentClass: DocumentClass): string[] {
    const attr = this.getAttributeByDocumentClass(documentClass);
    return attr.map((a) => a.attributeName);
  }

  // Method to get all mandatory attribute names for a given document class
  public getMandatoryAttributeNamesByDocumentClass(documentClass: DocumentClass): Attribute[] {
    return documentClass.attributes.filter((attr) => attr.mandatory);
  }

  // Method to get all non-mandatory attribute names for a given document class
  public getNonMandatoryAttributeNamesByDocumentClass(documentClass: DocumentClass): Attribute[] {
    return documentClass.attributes.filter((attr) => !attr.mandatory);
  }
  // Method to get attribute names with max length value for a given document class
  public getAttributesWithMaxLength(documentClass: DocumentClass): Attribute[] {
    return documentClass.attributes.filter((attr) => attr.maxLength !== undefined);
  }
  public getListAttributes(documentClass: DocumentClass): Attribute[] {
    return documentClass.attributes.filter((attr) => attr.attributeType === "List");
  }

  // Method to return all folder names that can add documents
  public getFolderNamesToAddDocument(): string[] {
    return Array.from(this.foldersMap.values())
      .filter((folder) => folder.canAdd)
      .map((folder) => folder.name);
  }
}
