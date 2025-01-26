/* eslint-disable no-restricted-syntax */
import { Locator, Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import DataBuilder from "Excel/DataBuilder";
import { Folder, DocumentClass, Attribute } from "Excel/types";
import TestUtils from "./TestUtils";
import StringUtil from "./StringUtil";

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
   * Checks the attributes for a given document.
   * @param document - The DocumentClass object representing the document.
   * @returns A promise that resolves when the check is complete.
   */
  private async checkAttrVisiblityForDoc(document: DocumentClass) {
    const attributes = this.dataBuilder.getAttributeNamesByDocumentClass(document);
    for (const attribute of attributes) {
      const selector = this.getAttributeSelector(attribute.attributeName);
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

  private async checkAttrMandatoryForDoc(document: DocumentClass) {
    const mandatoryAttr = this.dataBuilder.getMandatoryAttributeNamesByDocumentClass(document);
    for (const attribute of mandatoryAttr) {
      try {
        const isAttributeMandatory = await this.isAttributeMandatory(attribute);
        if (!isAttributeMandatory) {
          TestUtils.addWarning(`Warning: attribute: ${attribute} under document ${document.documentType} is not mandatory`);
        }
      } catch (error) {
        TestUtils.addWarning(`Error checking mandatory attributes for attribute: ${attribute} under document ${document.documentType}. Error: ${error.message}`);
      }
    }
  }

  private async checkNonMandatoryAttributes(document: DocumentClass) {
    const nonMandatory = this.dataBuilder.getNonMandatoryAttributeNamesByDocumentClass(document);
    for (const attribute of nonMandatory) {
      try {
        const isAttributeMandatory = await this.isAttributeMandatory(attribute.attributeName);
        if (isAttributeMandatory) {
          TestUtils.addWarning(`Warning: attribute: ${attribute} under document ${document.documentType} is mandatory`);
        }
      } catch (error) {
        TestUtils.addWarning(`Error checking mandatory attributes for attribute: ${attribute} under document ${document.documentType}. Error: ${error.message}`);
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

  private async isAttributeMandatory(attributeName: string): Promise<boolean> {
    const originalSelector = this.getAttributeSelector(attributeName);
    const selectorMainDiv = `${originalSelector}/ancestor::div[contains(@class, 'pvrProperty')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(selectorMainDiv);
    const classValue = await this.getAttribueFromElement(originalLocator, "class");
    const isMandatory = classValue?.includes('pvrPropertyRequired') || false;
    return isMandatory;
  }

  /**
   * Gets the Link locator of file name.
   * @param attributeName - The name of the attribute to locate.
   * @returns The XPath locator string for the attribute.
   */
  public getAttributeSelector(attributeName: string): string {
    const attributeSelector = `//label[text() = '${attributeName}']`;
    return attributeSelector;
  }

  /**
   * Creates a Locator object for an input element associated with a given attribute.
   * @param attributeName - The name of the attribute.
   * @returns The Locator object for the input element.
   */
  public async createAttributeInputLocator(attributeName: string) {
    const originalSelector = this.getAttributeSelector(attributeName);
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getAttribueFromElement(originalLocator, "for");
    const inputLocator = this.page.locator(`//input[@id="${forValue}"]`);
    return inputLocator;
  }

  private createMaxLengthSelector(attributeName: string, expectedMaxLength: number) {
    const maxSelector = `//div[text()="Description: ${attributeName}" and text() ="Maximum length: ${expectedMaxLength}"]`;
    return maxSelector;
  }

  /**
   * Creates an XPath selector for an input element associated with a given attribute.
   * @param attributeName - The name of the attribute.
   * @returns The XPath selector string for the input element.
   */
  public async createAttributeInputSelector(attributeName: string) {
    const originalSelector = this.getAttributeSelector(attributeName);
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const id = await this.getAttribueFromElement(originalLocator, "id");
    const inputSelector = `//input[@aria-labelledby="${id}"]`;
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
            await this.checkAttrVisiblityForDoc(document);
            await this.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
        }
      });
    });
  }

  public async checkMandatoryAttrForDoc(documentType: DocumentClass): Promise<void> {
    this.dataMap.forEach((folder) => {
      folder.documents.forEach(async (document) => {
        if (document.documentType === documentType.documentType) {  
            await this.checkAttrMandatoryForDoc(document);
            await this.checkNonMandatoryAttributes(document);
            await this.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
        }
      });
    });
  }

  /**
   * Checks the max length value for attributes that have a max length value.
   * @param document - The DocumentClass object representing the document.
   * @returns A promise that resolves when the check is complete.
   */
  public async checkMaxLengthForAttributes(document: DocumentClass): Promise<boolean> {
    const attributes = this.dataBuilder.getAttributesWithMaxLength(document);
    let allAttributesValid = true;
    for (const attribute of attributes) {
      const maxLength = this.createMaxLengthSelector(attribute.attributeName, attribute.maxLength);
      try {
        // Use expect to check if the locator is attached
        await this.uiActions.element(maxLength, `Max length locator for attribute ${attribute.attributeName}`).waitForPresent();
      } catch (error) {
        // Log an error if the locator is not attached
        TestUtils.addWarning(`Max length verification failed for attribute "${attribute.attributeName}": ${error.message}`);
        allAttributesValid = false; // Mark as invalid if the locator is not attached
      }
    }
    await this.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
    return allAttributesValid; // Return the overall result
  }

  private async clearAttribute(selector: string, attribute: Attribute): Promise<void> {
    switch (attribute.attributeType) {
        case 'String':
            await this.uiActions.element(selector, `element: ${attribute.attributeName}`).clear(); // Clear text field
            break;
        
        case 'Date':
            await this.uiActions.element(selector, `element: ${attribute.attributeName}`).clear(); // Clear date field
            break;

        case 'List':
            break;

        case 'Approval':
            break;

        default: 
            console.warn(`Unknown attribute type: ${attribute.attributeType}`); // Warn for unknown types 
            break; 
    }
}

 public async clearAttributesByDocumentType(
  documentType: DocumentClass,
): Promise<void> {
  try {
      // Get the list of attributes for the specified document type
      const attributes = this.dataBuilder.getAttributeNamesByDocumentClass(documentType);
      
      // Iterate over the attributes and clear their values
      for (const attribute of attributes) {
          const selector = await this.createAttributeInputSelector(attribute.attributeName); // Create locator for the attribute
          
          // Clear the attribute based on its type
          await this.clearAttribute(selector, attribute); // Call helper function to clear the attribute
      }
  } catch (error) {
      // Log the error with a custom message 
      console.error(`Error clearing attributes for document type "${documentType}": ${error.message}`);
      // Optionally, rethrow the error if you want the calling code to handle it 
      throw error;
  }
}

private async getListArrowSelector(id: string): Promise<string> {
  const listItemSelector = `//div[@widgetid="${id}"]//input[contains(@class,"dijitArrowButtonInner")]`;
  return listItemSelector;
}
private async getListLocatorsByID(id:string): Promise<string[]> {
  const selector = `//div[contains(@id, "${id}_popup") and @role ="option"]`;
  await this.uiActions.element(selector, "list item").waitForPresent();
  const locatorTexts = await this.page.locator(selector).allTextContents();
  return locatorTexts; 
}

public async extractActualListItemsForAttribute(attributeName: string): Promise<string[]> {
  let allTexts: string[] = []; // Array to collect texts from the list items

  try {
    // Create the locator based on the attribute label (XPath example)
    const attrInputLoc = await this.createAttributeInputLocator(attributeName);
    // Extract the ID from the activated attribute locator
    const id = await this.getAttribueFromElement(attrInputLoc, "id");
    const arrowSelector = await this.getListArrowSelector(id);
    try {
      await this.uiActions.element(arrowSelector, `Arrow button for ${attributeName} list`).click();
    } catch (error) {
      console.log(error);
    }
      // Get the list locators and count how many elements are present
      const innerText = await this.getListLocatorsByID(id);
     allTexts = StringUtil.filterArray(innerText);
      // Loop over each list item and collect the text content
  // Ignore the first and last elements if there are more than 2 items 
} catch (error) {
  console.error(`Error extracting list items for attribute "${attributeName}": ${error.message}`);
}
await this.uiActions.keyPress("Escape", "Dismiss list"); // Return the list items as is if there are 2 or fewer items
return allTexts;
}
}
