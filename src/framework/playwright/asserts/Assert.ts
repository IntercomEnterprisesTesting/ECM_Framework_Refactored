/* eslint-disable no-param-reassign */
import {
     test, expect, Locator, 
    } from '@playwright/test';

export default class Assert {
    /**
     * To verify that condition passed as input is true
     * @param condition - boolean condition
     * @param description - description of element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertTrue(condition: boolean, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is true`, async () => {
            try {
                expect(condition, `Expected is 'True' & Actual is '${condition}'`).toBeTruthy();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }
    /**
     * To verify that value1 contains value2
     * @param value1 - string input
     * @param value2 - should be present in value1
     * @param description - description of element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertContains(value1: string, value2: string, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
            try {
                expect(value1, `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
    * To verify that value1 contains value1 ignoring case
    * @param value1 - string input
    * @param value2 - should be present in value1
    * @param description - description of element that is being validated
    * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
    */
    public static async assertContainsIgnoreCase(value1: string, value2: string, description: string,
        softAssert = false) {
        await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
            try {
                expect(value1.toLowerCase(), `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2.toLowerCase());
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
   * To verify that actual contains expected ignoring case
   * @param actual - string input
   * @param expected - string input
   * @param description - description of element that is being validated
   * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
   */
    public static async assertEqualsIgnoreCase(actual: string, expected: string, description: string,
        softAssert = false) {
        await test.step(`Verifying that ${description} has text ${expected}`, async () => {
            try {
                expect(actual.toLowerCase(), `Expected '${expected}' should be EQUAL to Actual '${actual}'`)
                    .toEqual(expected.toLowerCase());
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify actual equals expected
     * @param value1 any object
     * @param value2 any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertEquals(actual: any, expected: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} has text ${expected}`, async () => {
            try {
                expect(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    public static async assertVisible(element :any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is Visible`, async () => {
            try {
                const locator : Locator = element.uiActions.getLocator();
                await expect(locator).toBeVisible({ timeout: 10000 });
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify that actual passed as input is false
     * @param condition boolean
     * @param description description of element that is being validated
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertFalse(condition: boolean, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is false`, async () => {
            try {
                expect(condition, `Expected is 'false' & Acutal is '${condition}'`).toBeFalsy();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
    * To verify that element not contains expected
    * @param actual any value 
    * @param expected any value
    * @param description description of element that is being validated
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
    public static async assertNotContains(actual: any, expected: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} does not contain '${expected}'`, async () => {
            try {
                await expect(actual, `'${actual}' should NOT CONTAIN '${expected}'`).not.toContain(expected);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify actual not equals to expected
     * @param actual any object
     * @param expected any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertNotEquals(actual: any, expected: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is not equals to ${expected}`, async () => {
            try {
                expect(actual, `Expected '${expected}' should NOT be EQUAL to Actual '${actual}'`).not.toEqual(expected);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To verify value not equals to null
     * @param value any value
     * @param description description of the value
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertNotNull(value: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is not null`, async () => {
            try {
                expect(value, `Expected is 'NOT null' & Actual is '${value}'`).not.toEqual(null);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To validate that value is not null
     * @param value any value
     * @param description description of the element
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertNull(value: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is equals to null`, async () => {
            try {
                expect(value, `Expected is 'null' & Actual is '${value}'`).toEqual(null);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
    * To validate that value is Undefined
    * @param value any value
    * @param description description of the element
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
    public static async assertUndefined(value: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is undefined`, async () => {
            try {
                expect(value, `Expected is 'Undefined' & Actual is '${value}'`).toEqual(typeof undefined);
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    /**
     * To validate that element is empty
     * @param value any element
     * @param description description of the element
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertToBeEmpty(value: any, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is empty`, async () => {
            try {
                await expect(value, `Expected is 'Empty' & Actual is '${value}'`).toBeEmpty();
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    public static assertStringFormat(actual: string, expectedFormat: string) {
        // Remove curly brackets if present
        actual = actual.replace(/^{|}$/g, '');
    
        // Convert format "8-4-4-4-12" to regex pattern
        const regex = this.createRegexFromFormat(expectedFormat);
        
        expect(actual).toMatch(regex);
      }

      private static createRegexFromFormat(format: string): RegExp {
        const pattern = format
          .split('-')
          .map((group) => `[A-Fa-f0-9]{${parseInt(group, 10)}}`) // Convert each part to numeric length
          .join('-');
    
        return new RegExp(`^${pattern}$`);
      }
      
    /**
     * To verify that an element identified by a selector is visible
     * @param selector - the selector of the element to check
     * @param description - description of the element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
    public static async assertLocatorVisible(locator: Locator, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is visible`, async () => {
            try {
                await expect(locator).toBeVisible({ timeout: 5000 });
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }

    public static async assertLocatorNotVisible(locator: Locator, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} is visible`, async () => {
            try {
                await expect(locator).not.toBeVisible({ timeout: 5000 });
            } catch (error) {
                if (!softAssert) {
                    throw new Error(error);
                }
            }
        });
    }
}
