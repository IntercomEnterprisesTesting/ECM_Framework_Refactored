/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import PropertiesPage from '@pages/PropertiesPage';
import HomePage from '@pages/HomePage';
import TestBase from './TestBase';

class SecurityMatrixManager extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SecurityMatrixManager();   

test.describe('[Security matrix - Manager]', () => {
    test.beforeEach(async () => {
        TestUtils.clearBugs(); // Create a new page
        await testClass.launchApplication();
    });

    test.afterEach(async () => {
        await testClass.context.close(); // Close the page after resolving bugs
        await TestUtils.checkBugs(); // Ensure bugs are resolved before closing the page
    });

    test('Verify that Manager can not Access Document (Before Checker Approval)', async () => {
        const document = testClass.excel.getDefaultDocument();
        try {
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(3);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
            if (isVisible) {
                TestUtils.addBug(`Bug: added file is visible to manager under document : ${document.documentType} before checker approval`);
            }
                } catch (error) {
            TestUtils.addBug(`Bug: Manager can access document ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Manager cannot add document', async () => {
        const document = testClass.excel.getDefaultDocument();
            await testClass.login.performLogin(3);
            await testClass.homeSteps.navigateToBrowse();
                    try {
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            const isEnabled = await testClass.homeSteps.checkAddButtonEnabled();
                if (isEnabled) {
                    TestUtils.addBug(`Bug : Add button is enabled for Manager under document ${document.documentType}`);
                    }
                } catch (error) {
            TestUtils.addBug(`Bug: Manager can add document ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Manager can delete document after checker approval', async () => {
            const document = testClass.excel.getDefaultDocument();
            try {
                await testClass.login.performLogin(1);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.homeSteps.openAddDoc(document);
                const fileName = await testClass.addDocument.addDocument(document);
                await testClass.homeSteps.verifyFileVisible(fileName);
                await testClass.homeSteps.logOut();
                await testClass.login.performLogin(2);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
                await testClass.homeSteps.clickPropertiesButton(fileName);
                await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
                await testClass.homeSteps.logOut();
                await testClass.login.performLogin(3);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
                const isEnabled = await testClass.homeSteps.isDeleteButtonEnabled(fileName);
                if (!isEnabled) {
                    TestUtils.addBug(`Bug : Delete button is disabled for Manager under document:  ${document.documentType} while it should not be`);
                }
                } catch (error) {
            TestUtils.addBug(`Bug: Manager can not delete docuemnt ${document.documentType} after checker approval- ${error.message}`);
        } 
    });

    test('Verify that Manager can not update document attributes after checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
            try {
                await testClass.login.performLogin(1);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.homeSteps.openAddDoc(document);
                const fileName = await testClass.addDocument.addDocument(document);
                await testClass.homeSteps.verifyFileVisible(fileName);
                await testClass.homeSteps.logOut();
                await testClass.login.performLogin(2);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
                await testClass.homeSteps.clickPropertiesButton(fileName);
                await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
                await testClass.homeSteps.logOut();
                await testClass.login.performLogin(3);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
                await testClass.homeSteps.clickPropertiesButton(fileName);
                await testClass.attributeUtil.checkAttrAreDisabledForDocClass(document);
                await testClass.properties.clickCancelButton();
                } catch (error) {
                TestUtils.addBug(`Bug: Manager can update docuemnt ${document.documentType} attributes after checker approval- ${error.message}`);
            } 
    });

    test('Verify that Manager can view document attributes after checker approval', async () => {
    const document = testClass.excel.getDefaultDocument();
            try {
    await testClass.login.performLogin(1);
    await testClass.homeSteps.navigateToBrowse();
    await testClass.homeSteps.openAddDoc(document);
    const fileName = await testClass.addDocument.addDocument(document);
    await testClass.homeSteps.verifyFileVisible(fileName);
    await testClass.homeSteps.logOut();
    await testClass.login.performLogin(2);
    await testClass.homeSteps.navigateToBrowse();
    await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
    await testClass.homeSteps.clickPropertiesButton(fileName);
    await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
    await testClass.homeSteps.logOut();
    await testClass.login.performLogin(3);
    await testClass.homeSteps.navigateToBrowse();
    await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
    await testClass.homeSteps.clickPropertiesButton(fileName);
    const isValid = testClass.attributeUtil.validateDocAttributes(document);
        if (!isValid) {
            TestUtils.addBug(`Bug: ${document.documentType} attributes are not visible`);
            }
    await testClass.properties.clickCancelButton();
        } catch (error) {
        TestUtils.addBug(`Bug: Manager Failed to view docuemnt ${document.documentType} attributes - ${error.message}`);
} 
    });

    test('Verify that Manager can not update document version after checker approval', async () => {
    const document = testClass.excel.getDefaultDocument();
    try {
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
        await testClass.homeSteps.openAddDoc(document);
        const fileName = await testClass.addDocument.addDocument(document);
        await testClass.homeSteps.verifyFileVisible(fileName);
        await testClass.homeSteps.logOut();
        await testClass.login.performLogin(2);
        await testClass.homeSteps.navigateToBrowse();
        await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
        await testClass.homeSteps.clickPropertiesButton(fileName);
        await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
        await testClass.homeSteps.logOut();
        await testClass.login.performLogin(3);
        await testClass.homeSteps.navigateToBrowse();
        await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
        await testClass.homeSteps.openActionMenu(fileName);
        await testClass.uiActions.element(HomePage.CHECK_OUT_BUTTON, "Check Out Button").isDisabled();
        } catch (error) {
    TestUtils.addBug(`Bug: Manager can update docuemnt ${document.documentType} version after checker approval- ${error.message}`);
} 
    });

  test.afterAll(async () => {
    await testClass.launchApplication();
    await testClass.login.performLogin(0);
    await testClass.homeSteps.navigateToBrowse();
    await testClass.clearFolders();
    await testClass.context.close();
});
});
