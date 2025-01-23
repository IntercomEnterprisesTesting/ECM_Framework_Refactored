/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
// eslint-disable-next-line import/extensions
import Assert from "@asserts/Assert";
import { Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import DataBuilder from "Excel/DataBuilder";
import { Folder } from "Excel/types";

export default class FolderNavigationUtil {
  private uiActions: UIActions;
  private dataBuilder: DataBuilder;
  private dataMap: Map<string, Folder>;
  private page: Page;

  constructor(uiActions: UIActions, excelDataProcessor: DataBuilder, page: Page) {
    this.uiActions = uiActions;
    this.dataBuilder = excelDataProcessor;
    this.dataMap = this.dataBuilder.getFoldersMap();
    this.page = page;
  }

  private getfolderPathSelector(folderName: string) {
    const folderPath = `//span[@class="dijitInline breadcrumbItem"]/div[text()="${folderName}"]`;
    return folderPath;
}

  private getFolderPathSelector(folderName: string) {
    const folderPath = `//span[@class="dijitInline breadcrumbItem"]/div[text()="${folderName}"]`; // Locator for the folder path
    return folderPath;
  }

  private getFolderMenuArrowSelector(folderName: string): string {
    const folderMenuSelector = `//div[contains(@id, 'ecm_widget_Tree_0')]//span[contains(text(), '${folderName}')]`;
    const folderMainDivSelector = `${folderMenuSelector}/ancestor::div[contains(@class, 'dijitTreeRow')]`;
    const folderArrowSelector = `${folderMainDivSelector}//span[contains(@data-dojo-attach-point, 'expandoNode')][1]`;
    return folderArrowSelector;
  }

  private async clickFolderMenuItem(folderName: string) {
    const folderMenuSelector = `//span[contains(text(), '${folderName}')]`;
    await this.uiActions.element(folderMenuSelector, "Folder Menu").click();
  }

  private getFolderNameSelector(folderName: string): string {
    const folderNameSelector = `//a[@class="anchorLink" and contains(@title, '${folderName}')]`;
    return folderNameSelector;
  }

  public async navigateToFolder(targetFolderName: string): Promise<void> {
    const rootFolderName = this.getRootFolderName();
    const folderHierarchy = this.buildFolderHierarchy(targetFolderName, rootFolderName);
    await this.navigateThroughHierarchy(folderHierarchy, rootFolderName);
  }

  private getRootFolderName(): string {
    const rootFolderName = this.dataBuilder.getRootFolderName();
    if (!rootFolderName) {
      throw new Error('Root folder not found');
    }
    return rootFolderName;
  }

  private buildFolderHierarchy(targetFolderName: string, rootFolderName: string): string[] {
    const folderHierarchy: string[] = [];
    let currentFolder = this.dataMap.get(targetFolderName);

    while (currentFolder && currentFolder.name !== rootFolderName) {
      folderHierarchy.unshift(currentFolder.name);
      currentFolder = this.dataMap.get(currentFolder.parent || '');
    }
    folderHierarchy.unshift(rootFolderName);

    return folderHierarchy;
  }

  private async navigateThroughHierarchy(folderHierarchy: string[], rootFolderName: string): Promise<void> {
    for (const folder of folderHierarchy) {
      try {
        const selector = this.getFolderSelector(folder, rootFolderName);
        await this.uiActions.element(selector, `${folder}`).click();
      } catch (error) {
        console.error(`Warning: Error navigating to folder "${folder}": ${error.message}`);
        // eslint-disable-next-line no-continue
      }
    }
  }

  public async assertFolderIsOpened(folder: string): Promise<void> {
    const folderIsOpenedElement = this.page.locator(this.getfolderPathSelector(folder));
    await Assert.assertLocatorVisible(folderIsOpenedElement, `${folder} is opened`);
  }

  private getFolderSelector(folder: string, rootFolderName: string): string {
    return folder === rootFolderName 
      ? `role=treeitem[name="${folder}"]` 
      : `role=link[name="${folder}"]`;
  }

  // public async navigateToFolder2(targetFolder: string): Promise<void> {
  //   const rootFolder = this.dataBuilder.getRootFolderName();
  //   const path: any[] = this.dataBuilder.getFolderPath(targetFolder);
  //   for (const folderName of path) {
  //     if (folderName === targetFolder) {
  //       await this.clickFolderMenuItem(folderName);
  //     } else {
  //       const folderMenuSelector = this.getFolderMenuArrowSelector(folderName);
  //       try {
  //         await this.uiActions.element(folderMenuSelector, `Folder ${folderName}`).click();
  //       } catch (error) {
  //         console.error(`Folder not found: ${folderName}`);
  //         throw new Error(`Folder not found: ${folderName}`);
  //       }
  //     }
  //   }
  // }

   public async navigateToDocumentFolder(documentType: string): Promise<void> {
    let targetFolderName: string | null = null;

    // Find the folder that contains the document type
    for (const [folderName, folder] of this.dataMap) {
        const document = folder.documents.find((doc) => doc.documentType === documentType);
        if (document) {
            targetFolderName = folderName; // Set target folder name if document found
            break;
        }
    }

    if (!targetFolderName) {
        throw new Error(`Folder containing document type "${documentType}" not found.`); // Error if folder not found
    }

    // Use existing logic to navigate to the target folder
    await this.navigateToFolder(targetFolderName);
}
    }
