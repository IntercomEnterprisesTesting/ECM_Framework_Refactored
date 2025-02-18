/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import PropertiesPage from '@pages/PropertiesPage';
import HomePage from '@pages/HomePage';
import TestBase from './TestBase';

class SecurityMatrixViewer extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SecurityMatrixViewer();

test.describe('[Security matrix - Viewer]', () => {
    // test.beforeAll(async () => {
    //     await testClass.login.launchApplication();
    // });

    test.beforeEach(async () => {
        TestUtils.clearBugs(); // Create a new page
        await testClass.login.launchApplication();
    });

    test.afterEach(async () => {
        await TestUtils.checkBugs(); // Ensure bugs are resolved before closing the page
        await testClass.context.close(); // Close the page after resolving bugs
    });

    test('Verify that Viewer can not Access Document (Before Checker Approval)', async () => {
        const document = testClass.excel.getDefaultDocument();
        try {
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
            if (isVisible) {
                TestUtils.addBug(`Bug: added file is visible to Viewer under document : ${document.documentType} before checker approval`);
            }
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer can access document ${document.documentType} - ${error.message}`);
        }
    });

    test('Verify that Viewer cannot add document', async () => {
        const document = testClass.excel.getDefaultDocument();
        await testClass.login.performLogin(4);
        await testClass.homeSteps.navigateToBrowse();
        try {
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            const isEnabled = await testClass.homeSteps.checkAddButtonEnabled();
            if (isEnabled) {
                TestUtils.addBug(`Bug : Add button is enabled for Viewer under document ${document.documentType}`);
            }
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer can add document ${document.documentType} - ${error.message}`);
        }
    });

    test('Verify that Viewer cannot delete document', async () => {
        const document = testClass.excel.getDefaultDocument();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
        try {
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            const enabled = await testClass.homeSteps.isDeleteButtonEnabled(fileName);
            if (enabled) {
                TestUtils.addBug(`Bug : Delete button is enabled for viewer for document : ${document.documentType} while it should not be`);
            }
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer can delete document ${document.documentType} - ${error.message}`);
        }
    });

    test('Verify that Viewer can not delete document after checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
        try {
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            const isEnabled = await testClass.homeSteps.isDeleteButtonEnabled(fileName);
            if (isEnabled) {
                TestUtils.addBug(`Delete button is enabled for Viewer under document:  ${document.documentType} while it should not be`);
            }
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer can not delete document ${document.documentType} after checker approval- ${error.message}`);
        }
    });

    test('Verify that Viewer can not update document attributes after checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
        try {
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.attributeUtil.checkAttrAreDisabledForDocClass(document);
            await testClass.properties.clickCancelButton();
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer can update document ${document.documentType} attributes after checker approval- ${error.message}`);
        }
    });

    test('Verify that Viewer can view document attributes after checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
        try {
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            const isValid = await testClass.attributeUtil.validateDocAttributes(document);
            if (!isValid) {
                TestUtils.addBug(`Bug: ${document.documentType} attributes are not visible for viewer`);
            }
            await testClass.properties.clickCancelButton();
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer Failed to view document ${document.documentType} attributes - ${error.message}`);
        }
    });

    test('Verify that Viewer can not update document version after checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
        try {
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.openActionMenu(fileName);
            await testClass.uiActions.element(HomePage.CHECK_OUT_BUTTON, "Check Out Button").isDisabled();
        } catch (error) {
            TestUtils.addBug(`Bug: Viewer can update document ${document.documentType} version after checker approval- ${error.message}`);
        }
    });

    // test.afterAll(async () => {
    //     await testClass.login.performLogin(0);
    //     await testClass.homeSteps.navigateToBrowse();
    //     await testClass.clearFolders();
    //     await testClass.context.close();
    // });
});
