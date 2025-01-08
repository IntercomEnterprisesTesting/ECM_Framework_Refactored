// eslint-disable-next-line import/extensions

export default class LinkUtil {
    /**
     * Gets the Link locator of file name
     * @param fileName
     * @returns 
     */
    public static getLinkSelector(fileName: string): string {
      const fileLocator = `//a[contains(@title, '${fileName}')]`;
      return fileLocator;
    }
    // public static getLinkLocator(fileName: string, page: Page): Locator {
    //   const fileLocator = `//a[contains(@title, '${fileName}')]`;
    //   const locator = this.page.locator(fileLocator);
    //   return locator;
    // }
  }
