/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import { DocumentClass } from 'Excel/types';
import StringUtil from '@utils/StringUtil';
import AddDocumentPage from '@pages/AddDocumentPage';
import TestBase from './TestBase';

class DocumentTests extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new DocumentTests();

test.describe('[Document Specs tests]', () => {
    test.beforeAll(async () => {
        await testClass.login.launchApplication();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
    });

    test.beforeEach(() => {
        TestUtils.clearBugs();
    });

test('Verify all documents have the correct attributes', async () => {
        const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
        for (const document of documents) {
                try {
                    await test.step(`checking attributes for document: ${document.documentType}`, async () => {
                        await testClass.homeSteps.openAddDoc(document);
                        const expectedAttrs = testClass.excel.getAttributeNameByDocumentClass(document);
                        const actualAttrs = await testClass.attributeUtil.getAllActualAttrs();    
                        const isValid = StringUtil.validateListItems(expectedAttrs, actualAttrs);
                        await testClass.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
                    if (!isValid) {
                        TestUtils.addBug(`Bug: ${document.documentType} attributes are not identical`);
                    }
                    });
                } catch (error) {
                    TestUtils.addBug(`Bug: Verify all documents have the correct attributes for document ${document.documentType} failed - ${error.message}`);
                }
        }
        TestUtils.checkBugs();
    }); 

test('Verify all documents mandatory attributes are correct', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`checking attributes for document: ${document.documentType}`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    await testClass.attributeUtil.checkMandatoryAttrForDoc(document);
                    await testClass.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
                });
            } catch (error) {
                TestUtils.addBug(`Bug: Verify all documents mandatory fields are correct for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkBugs();
});

test('Verify all documents max length attributes are correct', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`checking max length attributes for document: ${document.documentType}`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    await testClass.attributeUtil.checkMaxLengthForAttributes(document);
                });
            } catch (error) {
                TestUtils.addBug(`Bug: Verify all documents max length fields are correct for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkBugs();
});

test('Verify user cannot add document without mandatory fields', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`trying to add document: ${document.documentType} without mandatory fields`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    await testClass.addDocument.addDocumentWithNonMandAttr(document);
                    await testClass.addDocument.verifyMandErrorMsgAppears();
                    await testClass.attributeUtil.clearAttributesByDocumentType(document);
                    await testClass.uiActions.keyPress("Escape", "Escape Key");
                });
            } catch (error) {
                TestUtils.addBug(`Bug: Verify user cannot add document without mandatory fields for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkBugs();
});

test('Verify user can add document with only mandatory fields', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`trying to add document: ${document.documentType} without mandatory fields`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    const fileName = await testClass.addDocument.addDocument(document);
                    await testClass.homeSteps.verifyFileAdded(fileName);
                    if (testClass.uiActions.element(AddDocumentPage.ADD_DOCUMENT_WORD, "Add document page").isVisible()) {
                        await testClass.uiActions.keyPress("Escape", "Escape Key");
                    }
                });
            } catch (error) {
                TestUtils.addBug(`Bug: ${document.documentType} could not be found - ${error.message}`);           
            }
    }

    TestUtils.checkBugs();
});

test('Verify list items have the correct values for all List attributes', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
        const attributes = testClass.excel.getListAttributes(document);
        for (const attribute of attributes) {
            try {
                await test.step(`trying to add document: ${document.documentType} without mandatory fields`, async () => {
                    const expectedItems = testClass.excel.extractListAttributeValues(document.documentType, attribute.attributeName);
                    await testClass.homeSteps.openAddDoc(document);
                    const actualItems = await testClass.attributeUtil.extractActualListItemsForAttribute(attribute.attributeName);
                    const isValid = StringUtil.validateListItems(expectedItems, actualItems);
                    if (!isValid) {
                        TestUtils.addBug(`Bug: ${document.documentType} list items are not identical`);
                    }
                    await testClass.uiActions.keyPress("Escape", "Exit docuement Screen");
                });
            } catch (error) {
                TestUtils.addBug(`Bug: ${document.documentType} could not be found - ${error.message}`);
            }
        }   
    }

    TestUtils.checkBugs();
});

// test('Verify that user cannot add document with future date', async () => {
//     const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
//     for (const document of documents) {
//         const attributes = testClass.excel.getListAttributes(document);
//         for (const attribute of attributes) {
//             try {
//                 await test.step(`trying to add document: ${document.documentType} without mandatory fields`, async () => {
//                     const expectedItems = testClass.excel.extractListAttributeValues(document.documentType, attribute.attributeName);
//                     await testClass.homeSteps.openAddDoc(document);
//                     const actualItems = await testClass.attributeUtil.extractActualListItemsForAttribute(attribute.attributeName);
//                     const isValid = StringUtil.validateListItems(expectedItems, actualItems);
//                     if (!isValid) {
//                         TestUtils.addWarning(`Warning: ${document.documentType} list items are not identical`);
//                     }
//                     await testClass.uiActions.keyPress("Escape", "Exit docuement Screen");
//                 });
//             } catch (error) {
//                 TestUtils.addWarning(`Warning: ${document.documentType} could not be found - ${error.message}`);
//             }
//         }   
//     }

//     TestUtils.checkWarnings();
// });

// test('Verify all documents have the correct attributes', async () => {
//     const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
//     for (const document of documents) {
//             try {
//                 await test.step(`checking attributes for document: ${document.documentType}`, async () => {
//                     await testClass.homeSteps.openAddDoc(document);
//                     await testClass.attributeUtil.checkAttributesForDocumentType(document);
//                     await testClass.uiActions.keyPress("Escape", `Exiting document : ${document.documentType}`);
//                 });
//             } catch (error) {
//                 TestUtils.addWarning(`Warning: Verify all documents have the correct attributes for document ${document.documentType} failed - ${error.message}`);
//             }
//     }
//     TestUtils.checkWarnings();
// });

  test.afterAll(async () => {
    await testClass.page.close();
});
});
