/* eslint-disable no-restricted-syntax */
import { Locator, Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import DataBuilder from "excelProcessor/DataBuilder";
import { Folder, DocumentClass } from "excelProcessor/types";
import TestUtils from "./TestUtils";

export default class AttributeUtil {
  private page: Page;
  private dataBuilder: DataBuilder;
  private dataMap: Map<string, Folder>;
  private uiActions: UIActions;

  constructor(page: Page) {
    this.page = page;
    this.dataBuilder = new DataBuilder();
    this.dataMap = this.dataBuilder.getFoldersMap();
    this.uiActions = new UIActions(page);
  }

  /**
   * Gets the Link locator of file name
   * @param fileName
   * @returns 
   */
  public getAttributeSelector(attributeName: string): string {
    const attributeLocator = `//a[contains(@title, '${attributeName}')]`;
    return attributeLocator;
  }

  private createLocatorFromAttributeSelector(locator: string): Locator {
    const attributeLocator = this.page.locator(locator);
    return attributeLocator;
  }

  private async getAttribueFromElement(locator: Locator, attributeName: string) {
    const attributeValue = await locator.getAttribute(attributeName);
    return attributeValue;
  }

  public async createAttributeInputLocator(attributeName: string) {
    const originalSelector = `//label[contains(text(),'${attributeName}')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getAttribueFromElement(originalLocator, "for");
    const inputLocator = this.page.locator(`//input[@id="${forValue}"]`);
    return inputLocator;
  }

  public async createAttributeInputSelector(attributeName: string) {
    const originalSelector = `//label[contains(text(),'${attributeName}')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getAttribueFromElement(originalLocator, "for");
    const inputSelector = `//input[@id="${forValue}"]`;
    console.log(`attribute ${attributeName} selector: ${inputSelector}`);
    return inputSelector;
  }

  public async checkAttributesForDocumentType(documentType: DocumentClass): Promise<void> {
    this.dataMap.forEach((folder) => {
      folder.documents.forEach(async (document) => {
        if (document.documentType === documentType.documentType) {  
            await this.checkAttributesForDocument(document);
            await this.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
        }
      });
    });
  }

  private async checkAttributesForDocument(document: DocumentClass) {
    const attributes = this.dataBuilder.getAttributeNamesByDocumentClass(document);
    for (const attribute of attributes) {
      const selector = `//label[text()="${attribute}"]`;
      try {
        const isVisible = await this.uiActions.element(selector, `attribute: ${attribute}`).isVisible(60);
        if (!isVisible) {
          TestUtils.addWarning(`Warning: Missing attribute: ${attribute} under document ${document.documentType}`);
        }
      } catch (error) {
        TestUtils.addWarning(`Error checking visibility for attribute: ${attribute} under document ${document.documentType}. Error: ${error.message}`);
      }
    }
  }

  private async isAttributeVisible(attributeName: string): Promise<boolean> {
    const selector = `//label[text()="${attributeName}"]`;
      const visible = await this.uiActions.element(selector, `attribute: ${attributeName}`).isVisible(60);
      if (!visible) {
        return false;
      }
      return true;
    }
}
