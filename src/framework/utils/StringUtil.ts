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
      const randomNumber = this.randomNumberString(6); 
      return `TestDocument ${randomNumber}`;
    }

    public static filterArray(arr: string[]): string[] {
      const unwantedStrings = ["Previous choices", "More choices"]; // Strings to remove
      return arr.filter((item) => !unwantedStrings.includes(item));
    }

    public static validateListItems(expectedList: string[], actualList: string[]) : boolean {
      const missingItems: string[] = [];
      const extraItems: string[] = [];
      if (actualList.length === 0 || expectedList.length === 0) {
        TestUtils.addWarning(`List validation failed for document type . Either actual or expected list is empty.`);
      }
      for (const expectedItem of expectedList) {
        if (!expectedList.includes(expectedItem)) {
          missingItems.push(expectedItem); // If expected item is missing from the actual list
        }
      }
      // Optionally, check if there are extra items in actualListItems that are not expected
      for (const actualItem of actualList) {
        if (!actualList.includes(actualItem)) {
          extraItems.push(actualItem); // If actual item is not in the expected list
        }
      }
    
      // Print out the missing and extra elements, if any
      if (missingItems.length > 0 || extraItems.length > 0) {
        TestUtils.addWarning(`Document type Mismatch found in list items.`);
        
        if (missingItems.length > 0) {
          TestUtils.addWarning(`Missing items from list: ${missingItems}`);
          return false;
        }
        if (extraItems.length > 0) {
          TestUtils.addWarning(`Unexpected extra items in list: , ${extraItems}`);
          return false;
        }
      }
      return true;
    }
  }
