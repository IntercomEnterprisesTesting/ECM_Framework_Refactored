export interface Folder {
  name: string;
  parent: string | null;
  children?: { [key: string]: Folder }; // Optional object mapping for child folders
  documents: DocumentClass[];
  canAdd: boolean;
  isDefault: boolean; // Property to store the 'Default' column value
}

export interface DocumentClass {
  documentType: string;
  description: string;
  attributes: Attribute[];
  isDefault: boolean; // Property to store the 'Default' column value
  entryTemplate: string; // New property to store the 'Entry template' column value
}

export interface Attribute {
  attributeName: string;
  attributeType: string;
  mandatory: boolean;
  maxLength?: number;
  listValues?: string[];
  validationError?: string;
  futureDate?: boolean;
  dependant?: string; // New property for "Dependant" column
  defaultValue?: string; // New property for "Default value" column
}
