/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import HomePage from '@pages/HomePage';
import AddDocumentPage from '@pages/AddDocumentPage';
import PropertiesPage from '@pages/PropertiesPage';
import TestBase from './TestBase';

class SecurityMatrixMaker extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SecurityMatrixMaker();   

test.describe('[Security matrix - Maker]', () => {
    test.beforeEach(async () => {
        TestUtils.clearBugs();
        await testClass.launchApplication();
    });

    test.afterEach(async () => {
        await TestUtils.checkBugs(); // Ensure bugs are resolved before closing the page
        await testClass.context.close(); // Close the page after resolving bugs
    });

    test('Verify that maker can add document', async () => {
        const document = testClass.excel.getDefaultDocument();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
                    try {
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
                if (testClass.uiActions.element(AddDocumentPage.ADD_DOCUMENT_WORD, "Add document page").isVisible()) {
                    await testClass.uiActions.keyPress("Escape", "Escape Key");
                    }
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Failed to add docuemnt ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that maker can delete document before checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
                try {
        await testClass.homeSteps.openAddDoc(document);
        const fileName = await testClass.addDocument.addDocument(document);
        await testClass.homeSteps.verifyFileVisible(fileName);
        const enabled = await testClass.homeSteps.isDeleteButtonEnabled(fileName);
                if (!enabled) {
                    TestUtils.addBug(`Bug : Delete button is disabled for ${document.documentType} while it should not be`);
                }
            } catch (error) {
        TestUtils.addBug(`Bug: Maker cannot delete docuemnt ${document.documentType} before checker approval - ${error.message}`);
    } 
    });

    test('Verify that maker can update document status from rejected to not approved', async () => {
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
        await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
        await testClass.homeSteps.clickPropertiesButton(fileName);
        await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Rejected");
        await testClass.homeSteps.logOut();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
        await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
        await testClass.homeSteps.clickPropertiesButton(fileName);
        const newStatus = "Not Approved";
        await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, newStatus);
        await testClass.homeSteps.clickPropertiesButton(fileName);
        const status = await testClass.properties.checkAttrValue("حاله المستند");
        await testClass.properties.clickCancelButton();
        if (status !== newStatus) {
            TestUtils.addBug(`Bug :Expected status to be ${newStatus} but got ${status}`);
        }
            } catch (error) {
        TestUtils.addBug(`Bug: Maker Failed to update docuemnt ${document.documentType} status from rejected to not approved - ${error.message}`);
    } 
        });

    test('Verify that maker can update document attributes before checker approval', async () => {
            const document = testClass.excel.getDefaultDocument();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
                    try {
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
            const editable = await testClass.homeSteps.isDocEditable(fileName);
            if (!editable) {
                TestUtils.addBug(`Document ${document.documentType} is not editable, Edit button is not visible`);
            }
                } catch (error) {
            TestUtils.addBug(`Bug: Maker Failed to update docuemnt ${document.documentType} attributes before checker approval- ${error.message}`);
        } 
        });
        
    test('Verify that maker can view document attributes after checker approval', async () => {
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
    await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
    await testClass.homeSteps.clickPropertiesButton(fileName);
    await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
    await testClass.homeSteps.logOut();
    await testClass.login.performLogin(1);
    await testClass.homeSteps.navigateToBrowse();
    await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
    await testClass.homeSteps.clickPropertiesButton(fileName);
    const isValid = testClass.attributeUtil.validateDocAttributes(document);
        if (!isValid) {
            TestUtils.addBug(`Bug: ${document.documentType} attributes are not visible`);
            }
    await testClass.properties.clickCancelButton();
        } catch (error) {
    TestUtils.addBug(`Bug: Failed to view docuemnt ${document.documentType} attributes - ${error.message}`);
} 
    });

    test('Verify that maker can update document version before checker approval', async () => {
    const document = testClass.excel.getDefaultDocument();
    await testClass.login.performLogin(1);
    await testClass.homeSteps.navigateToBrowse();
            try {
    await testClass.homeSteps.openAddDoc(document);
    const fileName = await testClass.addDocument.addDocument(document);
    await testClass.homeSteps.verifyFileVisible(fileName);
    await testClass.homeSteps.checkOutFile(fileName);
    await testClass.homeSteps.checkInFile(fileName);
    await testClass.checkIn.checkInfile();
    await testClass.homeSteps.clickPropertiesButton(fileName);
    await testClass.properties.verifyDocumentVersion();
    await testClass.properties.clickCancelButton();
        } catch (error) {
    TestUtils.addBug(`Bug: Maker Failed to update docuemnt ${document.documentType} version before checker approval- ${error.message}`);
} 
    });

    test('Verify that maker can not update document version after checker approval', async () => {
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
        await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
        await testClass.homeSteps.clickPropertiesButton(fileName);
        await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
        await testClass.homeSteps.logOut();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
        await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
        await testClass.homeSteps.openActionMenu(fileName);
        await testClass.uiActions.element(HomePage.CHECK_OUT_BUTTON, "Check Out Button").isDisabled();
        } catch (error) {
    TestUtils.addBug(`Bug: Maker can update docuemnt ${document.documentType} version after checker approval- ${error.message}`);
} 
    });

    test('Verify that maker can not update document attributes after checker approval', async () => {
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
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.attributeUtil.checkAttrAreDisabledForDocClass(document);
            await testClass.properties.clickCancelButton();
            } catch (error) {
        TestUtils.addBug(`Bug: Maker can update docuemnt ${document.documentType} attributes after checker approval- ${error.message}`);
    } 
    });

    test('Verify that maker can not delete document after checker approval', async () => {
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
                await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
                await testClass.homeSteps.clickPropertiesButton(fileName);
                await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
                await testClass.homeSteps.logOut();
                await testClass.login.performLogin(1);
                await testClass.homeSteps.navigateToBrowse();
                await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
                const enabled = await testClass.homeSteps.isDeleteButtonEnabled(fileName);
                if (enabled) {
                    TestUtils.addBug(`Delete button is enabled for ${document.documentType} while it should not be`);
                }
                } catch (error) {
            TestUtils.addBug(`Bug: Maker can delete docuemnt ${document.documentType} after checker approval- ${error.message}`);
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
