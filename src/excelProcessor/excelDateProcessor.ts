/* eslint-disable import/no-named-as-default */
import * as XLSX from 'xlsx';
import TestConstants from '@uiConstants/TestConstants';
import FolderProcessor from './FolderProcessor';
import DocumentProcessor from './documentProcessor';
import AttributeProcessor from './attributesProcessor';
import { Folder, Attribute } from './types';

export default class ExcelDataProcessor {
  private folderProcessor: FolderProcessor = new FolderProcessor();
  private documentProcessor: DocumentProcessor = new DocumentProcessor();
  private attributeProcessor: AttributeProcessor = new AttributeProcessor();
  private foldersMap = this.folderProcessor.getFoldersMap();

  public defaultFolder = "";
  public defaultDocument = "";
  public defaultDocumentEntryTemplate = "";

  constructor() {
    const filePath = TestConstants.PROJECT_FILE;
    this.readExcelFileAndBuildMap(filePath);
    this.defaultFolder = this.folderProcessor.getDefaultFolder();
    this.defaultDocument = this.documentProcessor.getDefaultDocument(this.folderProcessor.getFoldersMap());
    // eslint-disable-next-line max-len
    this.defaultDocumentEntryTemplate = this.documentProcessor.getDefaultDocumentEntryTemplate(this.folderProcessor.getFoldersMap());
  }

  private readExcelFileAndBuildMap(filePath: string): void {
    const workbook = XLSX.readFile(filePath);

    const folderSheet = workbook.Sheets['Folder structure'];
    const folderData = XLSX.utils.sheet_to_json<any>(folderSheet);

    const documentSheet = workbook.Sheets['Document Types'];
    const documentData = XLSX.utils.sheet_to_json<any>(documentSheet);

    const attributeSheet = workbook.Sheets['Attributes Sheet'];
    const attributeData = XLSX.utils.sheet_to_json<any>(attributeSheet);

    this.folderProcessor.processFolders(folderData);
    this.documentProcessor.processDocuments(documentData, this.folderProcessor.getFoldersMap());
    this.attributeProcessor.processAttributes(attributeData, this.folderProcessor.getFoldersMap());
  }

  public getMandatoryAttributesByDocumentType(documentType: string): Attribute[] {
    // eslint-disable-next-line max-len
    return this.attributeProcessor.getMandatoryAttributesByDocumentType(documentType, this.folderProcessor.getFoldersMap());
  }

  public getFoldersMap(): Map<string, Folder> {
    return this.folderProcessor.getFoldersMap();
  }

  public getDefaultFolder(): string {
    return this.defaultFolder;
  }

  public getDefaultDocument(): string {
    return this.defaultDocument;
  }

  public getDefaultDocumentEntryTemplate(): string {
    return this.defaultDocumentEntryTemplate;
  }

  public getFolderHierarchy(folderName: string): string[] {
    console.log(`Starting getFolderHierarchy with folderName: ${folderName}`);
    if (!folderName) {
      console.error('folderName is null, undefined, or empty');
      return [];
    }

    const hierarchy: string[] = [];
    let currentFolder = this.foldersMap.get(folderName);

    while (currentFolder) {
      console.log(`Current folder: ${currentFolder.name}`);
      hierarchy.unshift(currentFolder.name);
      if (currentFolder.parent && currentFolder.parent !== 'Root folder') {
        currentFolder = this.foldersMap.get(currentFolder.parent) || null;
      } else {
        break;
      }
    }

    if (!currentFolder) {
      console.log('Reached the root folder or folder not found in map');
    }

    console.log(`Final hierarchy: ${hierarchy}`);
    return hierarchy;
  }
}
