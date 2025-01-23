/* eslint-disable no-restricted-syntax */
import { Locator, Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import DataBuilder from "Excel/DataBuilder";
import { Folder, DocumentClass } from "Excel/types";
import TestUtils from "./TestUtils";

/**
 * Utility class for handling attributes within a page.
 */
export default class AttributeUtil {
  private page: Page;
  private dataBuilder: DataBuilder;
  private dataMap: Map<string, Folder>;
  private uiActions: UIActions;

  /**
   * Constructs an instance of AttributeUtil.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.dataBuilder = new DataBuilder();
    this.dataMap = this.dataBuilder.getFoldersMap();
    this.uiActions = new UIActions(page);
  }

  /**
   * Gets the Link locator of file name.
   * @param attributeName - The name of the attribute to locate.
   * @returns The XPath locator string for the attribute.
   */
  public getAttributeSelector(attributeName: string): string {
    const attributeLocator = `//a[contains(@title, '${attributeName}')]`;
    return attributeLocator;
  }

  /**
   * Creates a Locator object from an attribute selector.
   * @param locator - The XPath locator string.
   * @returns The Locator object.
   */
  private createLocatorFromAttributeSelector(locator: string): Locator {
    const attributeLocator = this.page.locator(locator);
    return attributeLocator;
  }

  /**
   * Gets the value of an attribute from an element.
   * @param locator - The Locator object for the element.
   * @param attributeName - The name of the attribute to retrieve.
   * @returns The value of the attribute.
   */
  private async getAttribueFromElement(locator: Locator, attributeName: string) {
    const attributeValue = await locator.getAttribute(attributeName);
    return attributeValue;
  }

  /**
   * Creates a Locator object for an input element associated with a given attribute.
   * @param attributeName - The name of the attribute.
   * @returns The Locator object for the input element.
   */
  public async createAttributeInputLocator(attributeName: string) {
    const originalSelector = `//label[contains(text(),'${attributeName}')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getAttribueFromElement(originalLocator, "for");
    const inputLocator = this.page.locator(`//input[@id="${forValue}"]`);
    return inputLocator;
  }

  /**
   * Creates an XPath selector for an input element associated with a given attribute.
   * @param attributeName - The name of the attribute.
   * @returns The XPath selector string for the input element.
   */
  public async createAttributeInputSelector(attributeName: string) {
    const originalSelector = `//label[contains(text(),'${attributeName}')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getAttribueFromElement(originalLocator, "for");
    const inputSelector = `//input[@id="${forValue}"]`;
    console.log(`attribute ${attributeName} selector: ${inputSelector}`);
    return inputSelector;
  }

  /**
   * Checks the attributes for a given document type.
   * @param documentType - The DocumentClass object representing the document type.
   * @returns A promise that resolves when the check is complete.
   */
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

  /**
   * Checks the attributes for a given document.
   * @param document - The DocumentClass object representing the document.
   * @returns A promise that resolves when the check is complete.
   */
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

  /**
   * Checks if an attribute is visible on the page.
   * @param attributeName - The name of the attribute to check.
   * @returns A promise that resolves to a boolean indicating whether the attribute is visible.
   */
  private async isAttributeVisible(attributeName: string): Promise<boolean> {
    const selector = `//label[text()="${attributeName}"]`;
      const visible = await this.uiActions.element(selector, `attribute: ${attributeName}`).isVisible(60);
      if (!visible) {
        return false;
      }
      return true;
    }
}
