import { Folder } from './types';

export default class FolderProcessor {
  private foldersMap: Map<string, Folder> = new Map();
  private folderChildrenMap: Map<string, { [key: string]: Folder }> = new Map();

  public processFolders(folderData: any[]): void {
    folderData.forEach((row: any) => {
      const folderName = row['Folder name'];
      const parentFolder = row['Parent Folder'];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const canAdd = row['CanAdd'] === 'Y';
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const isDefault = row['Default'] === 'Y';

      const folder: Folder = {
        name: folderName,
        parent: parentFolder === 'Root folder' ? null : parentFolder,
        children: {},
        documents: [],
        canAdd: canAdd,
        isDefault: isDefault,
      };

      this.foldersMap.set(folderName, folder);

      if (parentFolder !== 'Root folder') {
        if (!this.folderChildrenMap.has(parentFolder)) {
          this.folderChildrenMap.set(parentFolder, {});
        }
        const parentChildren = this.folderChildrenMap.get(parentFolder);
        if (parentChildren) {
          parentChildren[folderName] = folder;
        }
      }
    });

    this.assignChildrenToParentFolders();
  }

  private assignChildrenToParentFolders(): void {
    this.folderChildrenMap.forEach((children, parentName) => {
      const parentFolder = this.foldersMap.get(parentName);
      if (parentFolder) {
        parentFolder.children = children;
      }
    });
  }

  public getFoldersMap(): Map<string, Folder> {
    return this.foldersMap;
  }

  public getDefaultFolder(): string {
    const defaultFolder = Array.from(this.foldersMap.values()).find((folder) => folder.isDefault);
    return defaultFolder ? defaultFolder.name : "";
  }
}
