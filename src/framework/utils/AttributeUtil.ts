import { Locator, Page } from "@playwright/test";

export default class AttributeUtil {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
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

  private createLocatorFromAttributeSelector(attributeName: string): Locator {
    const attributeLocator = this.page.locator(`//a[contains(@title, '${attributeName}')]`);
    return attributeLocator;
  }

  private async getForFromElement(locator: Locator) {
    const forValue = await locator.getAttribute('for');
    return forValue;
  }

  public async createAttributeInputLocator(attributeName: string) {
    const originalSelector = `//label[contains(text(),'${attributeName}')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getForFromElement(originalLocator);
    const inputLocator = this.page.locator(`//input[@id="${forValue}"]`);
    return inputLocator;
  }

  public async createAttributeInputSelector(attributeName: string) {
    const originalSelector = `//label[contains(text(),'${attributeName}')]`;
    const originalLocator = this.createLocatorFromAttributeSelector(originalSelector);
    const forValue = await this.getForFromElement(originalLocator);
    const inputSelector = `//input[@id="${forValue}"]`;
    return inputSelector;
  }
}
