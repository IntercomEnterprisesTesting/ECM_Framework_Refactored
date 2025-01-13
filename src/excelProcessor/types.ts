export interface Folder {
    name: string;
    parent: string | null;
    children?: { [key: string]: Folder };
    documents: DocumentType[];
    canAdd: boolean;
    isDefault: boolean;
  }
  
  export interface DocumentType {
    documentType: string;
    description: string;
    attributes: Attribute[];
    isDefault: boolean;
    entryTemplate: string;
  }
  
  export interface Attribute {
    attributeName: string;
    attributeType: string;
    mandatory: boolean;
    maxLength?: number;
    listValues?: string[];
    validationError?: string;
    futureDate?: boolean;
    dependant?: string;
    defaultValue?: string;
  }
