/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import randomString from "randomstring";
import format from "string-format";
import TestUtils from "./TestUtils";

export default class StringUtil {
  /**
   * This method will return the formatted String by replacing value in {\d}
   * @param str : String to be formatted
   * @param replaceValue : value to replaced in formatted string
   * @returns str
   */
  public static formatString(str: string, ...replaceValue: string[]): string {
    for (let i = 0; i < replaceValue.length; i++) {
      // eslint-disable-next-line no-param-reassign
      str = str.split(`{${i}}`).join(replaceValue[i]);
    }
    return str;
  }

  /**
   * This method will return the formatted String by replacing value in {key}
   * @param str : String to be formatted
   * @param replaceValue : value to replaced in formatted string
   * @returns str
   */
  public static formatStringValue(str: string, replaceValue: any): string {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(replaceValue)) {
      // eslint-disable-next-line no-param-reassign
      str = str.split(`{${key}}`).join(`${value}`);
    }
    return str;
  }

  /**
   * Replaces text in a string, using an string that supports replacement within a string.
   * @param str Original string
   * @param searchValue searches for and replace matches within the string.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   * @returns 
   */
  public static replaceAll(str: string, searchValue: string, replaceValue: string): string {
    const replacer = new RegExp(searchValue, 'g');
    const replacedStr = str.replace(replacer, replaceValue);
    return replacedStr;
  }

  /**
   * replaces the regex with string value
   * @param str 
   * @param regex 
   * @param value 
   * @returns 
   */
  public static getRegXLocator(str: string, regex: RegExp, value: string) {
    return str.replace(regex, value);
  }

  /**
   * Generates random alphanumeric string of given length
   * @param length 
   * @returns 
   */
  public static randomAlphanumericString(length: number): string {
    const str = randomString.generate(length);
    return str;
  }

  /**
   * Generates random string of given length
   * @param length
   * @returns
   */
  public static randomAlphabeticString(length: number): string {
    const str = randomString.generate({ length: length, charset: 'alphabetic' });
    return str;
  }

  /**
   * Generates random string of given length with all letters a as uppercase
   * @param length
   * @returns
   */
  public static randomUppercaseString(length: number): string {
    const str = randomString.generate({ length: length, charset: 'alphabetic', capitalization: "uppercase" });
    return str;
  }

  /**
   * Generates random string of given length with all letters a as lowercase
   * @param length
   * @returns
   */
  public static randomLowercaseString(length: number): string {
    const str = randomString.generate({ length: length, charset: 'alphabetic', capitalization: "lowercase" });
    return str;
  }

  /**
   * Generates random number string of given length
   * @param length
   * @returns
   */
  public static randomNumberString(length: number): string {
    const str = randomString.generate({ length: length, charset: 'numeric' });
    return str;
  }

  /**
   * This method will return the formatted String by replacing value in {key} from Object
   * @param str 
   * @param obj 
   * @returns 
   */
  public static formatStringFromObject(str: string, obj: any): string {
    return format(str, obj);
  }
    /**
   * Generates a string of format 'TestDocument {random number of 6 digits}'
   * @returns
   */
    public static generateTestDocumentName(): string {
      const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/[T.]/g, '_')
      .slice(0, 14); // Format: YYYYMMDD_HHMMSS
      return `TestDocument ${timestamp}`;
    }

    public static filterArray(arr: string[]): string[] {
      const unwantedStrings = ["Previous choices", "More choices"]; // Strings to remove
      return arr.filter((item) => !unwantedStrings.includes(item));
    }

    public static validateListItems(expectedList: string[], actualList: string[]): boolean {
      // Normalize the arrays by converting non-breaking spaces to regular spaces
      const normalizeSpaces = (arr: string[]): string[] => arr.map((item) => item.replace(/ /g, ' ')); // Replace non-breaking space with regular space
  
      // Normalize both expected and actual lists
      const normalizedExpectedList = normalizeSpaces(expectedList);
      const normalizedActualList = normalizeSpaces(actualList);
  
      if (normalizedExpectedList.length === 0 || normalizedActualList.length === 0) {
          TestUtils.addBug(`validation failed: either actual or expected list is empty.`);
          return false;
      }
  
      const missingItems = normalizedExpectedList.filter((expectedItem) => !normalizedActualList.some((actualItem) => expectedItem === actualItem));
  
      const extraItems = normalizedActualList.filter((actualItem) => !normalizedExpectedList.some((expectedItem) => expectedItem === actualItem));
  
      if (missingItems.length || extraItems.length) {
          TestUtils.addBug(`Document type mismatch found in the comparing items.`);
          if (missingItems.length) TestUtils.addBug(`Missing items: ${missingItems.join(", ")}`);
          if (extraItems.length) TestUtils.addBug(`Extra items: ${extraItems.join(", ")}`);
          return false; 
      }
  
      return true;
  }
  }
