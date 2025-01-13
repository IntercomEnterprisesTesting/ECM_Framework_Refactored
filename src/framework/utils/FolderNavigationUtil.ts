/* eslint-disable max-len */
// eslint-disable-next-line import/extensions
import Assert from "@asserts/Assert";
import { Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import ExcelDataProcessor from "excelProcessor/excelDateProcessor";

export default class FolderNavigationUtil {
  private uiActions: UIActions;
  private excelDataProcessor: ExcelDataProcessor;

  constructor(uiActions: UIActions, excelDataProcessor: ExcelDataProcessor) {
    this.uiActions = uiActions;
    this.excelDataProcessor = excelDataProcessor;
  }
  private getFolderPathSelector(folderName: string) {
    const folderPath = `//span[@class="dijitInline breadcrumbItem"]/div[text()="${folderName}"]`; // Locator for the folder path
    return folderPath;
}
    private static getFolderMenuArrowSelector(folderName: string): string {
    const folderMenuSelector = `//span[contains(text(), '${folderName}')]`;
    const folderMainDivSelector = `${folderMenuSelector}/ancestor::div[contains(@class, 'dijitTreeRow')]`;
    const folderArrowSelector = `${folderMainDivSelector}//span[contains(@data-dojo-attach-point, 'expandoNode')][1]`;
    return folderArrowSelector;
   }

   private async clickFolderMenuItem(folderName: string) {
    const folderMenuSelector = `//span[contains(text(), '${folderName}')]`;
    await this.uiActions.element(folderMenuSelector, "Folder Menu").click();
   }

   private async getFolderNameSelector(folderName: string): Promise<string> {
    const folderNameSelector = `//a[@class="anchorLink" and contains(@title, '${folderName}')]`;
    return folderNameSelector;
   }

   public async navigateToFolder(targetFolder: string): Promise<void> {
      const hierarchy : any[] = this.excelDataProcessor.getFolderHierarchy(targetFolder);
      console.log(`hit the folder ${hierarchy}`);
      await Promise.all(hierarchy.map(async (folderName) => {
        const folderMenuSelector = await this.getFolderNameSelector(folderName);
        await this.uiActions.element(folderMenuSelector, "Folder Arrow").click();
      }));
    }
   }
