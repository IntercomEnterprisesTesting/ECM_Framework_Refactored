import { Folder, DocumentType } from './types';

export default class DocumentProcessor {
  public processDocuments(documentData: any[], foldersMap: Map<string, Folder>): void {
    documentData.forEach((row: any) => {
      const folderName = row['Folder name'];
      const documentType = row['Document type'];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const isDefault = row['Default'] === 'Y';
      const entryTemplate = row['Entry template'] || '';

      const folder = foldersMap.get(folderName);

      if (folder) {
        const document: DocumentType = {
          documentType: documentType,
          description: '',
          attributes: [],
          isDefault: isDefault,
          entryTemplate: entryTemplate,
        };
        folder.documents.push(document);
      }
    });
  }

  public getDefaultDocument(foldersMap: Map<string, Folder>): string {
    let defaultDocumentType = "";
    foldersMap.forEach((folder) => {
      const defaultDocument = folder.documents.find((document) => document.isDefault);
      if (defaultDocument) {
        defaultDocumentType = defaultDocument.documentType;
      }
    });
    return defaultDocumentType;
  }

  public getDefaultDocumentEntryTemplate(foldersMap: Map<string, Folder>): string {
    let entryTemplate = "";
    foldersMap.forEach((folder) => {
      const defaultDocument = folder.documents.find((document) => document.isDefault);
      if (defaultDocument) {
        entryTemplate = defaultDocument.entryTemplate;
      }
    });
    return entryTemplate;
  }
}
