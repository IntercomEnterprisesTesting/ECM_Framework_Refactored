// eslint-disable-next-line import/extensions

import { Locator, Page } from "@playwright/test";

export default class AttributeUtil {
    /**
     * Gets the Link locator of file name
     * @param fileName
     * @returns 
     */
    public static getAttributeSelector(attributeName: string): string {
      const attributeLocator = `//a[contains(@title, '${attributeName}')]`;
      return attributeLocator;
    }

    public static createLocatorFromAttributeSelector(page: Page, attributeName: string): Locator {
      const attribueLocator = page.locator(`//a[contains(@title, '${attributeName}')]`);
      return attribueLocator;
    }

    private static async getForFromElement(locator:Locator) {
      const forValue = await locator.getAttribute('for');
        return forValue;
    }

    public static async createAttributeInputLocator(page: Page, attributeName: string) {
      const originalSelector = `//label[contains(text(),'${attributeName}')]`;
      const originalLocator = this.createLocatorFromAttributeSelector(page, originalSelector);
      const forValue = await this.getForFromElement(originalLocator);
      const inputLocator = page.locator(`//input[@id="${forValue}"]`);
      return inputLocator; 
  }
  }
