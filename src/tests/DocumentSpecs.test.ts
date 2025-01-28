/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import { DocumentClass } from 'Excel/types';
import StringUtil from '@utils/StringUtil';
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
        TestUtils.clearWarnings();
    });

test('Verify all documents have the correct attributes', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`checking attributes for document: ${document.documentType}`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    await testClass.attributeUtil.checkAttributesForDocumentType(document);
                });
            } catch (error) {
                TestUtils.addWarning(`Warning: Verify all documents have the correct attributes for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkWarnings();
});

test('Verify all documents mandatory attributes are correct', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`checking attributes for document: ${document.documentType}`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    await testClass.attributeUtil.checkMandatoryAttrForDoc(document);
                });
            } catch (error) {
                TestUtils.addWarning(`Warning: Verify all documents mandatory fields are correct for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkWarnings();
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
                TestUtils.addWarning(`Warning: Verify all documents max length fields are correct for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkWarnings();
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
                TestUtils.addWarning(`Warning: Verify user cannot add document without mandatory fields for document ${document.documentType} failed - ${error.message}`);
            }
    }
    TestUtils.checkWarnings();
});

test('Verify user can add document with only mandatory fields', async () => {
    const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
    for (const document of documents) {
            try {
                await test.step(`trying to add document: ${document.documentType} without mandatory fields`, async () => {
                    await testClass.homeSteps.openAddDoc(document);
                    const fileName = await testClass.addDocument.addDocument(document);
                    await testClass.homeSteps.verifyFileAdded(fileName);
                });
            } catch (error) {
                TestUtils.addWarning(`Warning: ${document.documentType} could not be found - ${error.message}`);
            }
    }

    TestUtils.checkWarnings();
});

test('test list', async () => {
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
                        TestUtils.addWarning(`Warning: ${document.documentType} list items are not identical`);
                    }
                    await testClass.uiActions.keyPress("Escape", "Exit docuement Screen");
                });
            } catch (error) {
                TestUtils.addWarning(`Warning: ${document.documentType} could not be found - ${error.message}`);
            }
        }   
    }

    TestUtils.checkWarnings();
});
});
