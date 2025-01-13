import { Folder, Attribute } from './types';

export default class AttributeProcessor {
  private mandatoryAttributesByDocumentType: Map<string, Attribute[]> = new Map();

  public processAttributes(attributeData: any[], foldersMap: Map<string, Folder>): void {
    attributeData.forEach((row: any) => {
      const documentType = row['Document type'];
      foldersMap.forEach((folder) => {
        folder.documents.forEach((doc) => {
          if (doc.documentType === documentType) {
            const attribute: Attribute = {
              attributeName: row['Attribute name'],
              attributeType: row['Attribute Type'],
              // eslint-disable-next-line @typescript-eslint/dot-notation
              mandatory: row['Mandatory'] === 'Y',
              maxLength: row['Max Length'] ? parseInt(row['Max Length'], 10) : undefined,
              listValues: row['List values'] ? row['List values'].split(',') : undefined,
              validationError: row['Validation error'] || '',
              futureDate: row['Future date'] !== 'N',
              // eslint-disable-next-line @typescript-eslint/dot-notation
              dependant: row['Dependant'] || '',
              defaultValue: row['Default value'] || '',
            };
            doc.attributes.push(attribute);
          }
        });
      });
    });
  }

  public getMandatoryAttributesByDocumentType(documentType: string, foldersMap: Map<string, Folder>): Attribute[] {
    if (!this.mandatoryAttributesByDocumentType.has(documentType)) {
      const attributes: Attribute[] = [];
      foldersMap.forEach((folder) => {
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
      this.mandatoryAttributesByDocumentType.set(documentType, attributes);
    }
    const attributes = this.mandatoryAttributesByDocumentType.get(documentType);
    if (!attributes) {
      throw new Error(`No attributes found for document type: ${documentType}`);
    }
    return attributes;
  }
}
