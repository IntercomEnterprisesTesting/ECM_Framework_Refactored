/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import AddDocumentPage from '@pages/AddDocumentPage';
import PropertiesPage from '@pages/PropertiesPage';
import TestBase from './TestBase';

class SearchTemplate extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SearchTemplate();   

test.describe('[Search Template]', () => {
    test.beforeEach(async () => {
        TestUtils.clearBugs();
        await testClass.launchApplication();
    });

    test.afterEach(async () => {
        await testClass.context.close(); // Close the page after resolving bugs
        await TestUtils.checkBugs(); // Ensure bugs are resolved before closing the page
    });

    test('Verify that maker can view document in search template before checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Maker cannot see added file in search before checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that deleted documents do not appear in search for maker', async () => {
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
            await testClass.homeSteps.deleteFile(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
                if (isVisible) {
                    TestUtils.addBug(`Bug: Deleted file is visible to User after deletion : ${document.documentType}`);
                }
                } catch (error) {
            TestUtils.addBug(`Bug: Deleted file is visible to user in search after deletion document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that maker can view document in search template After checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Maker cannot see added file in search after checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Checker can view document in search template Before checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Checker cannot see added file in search before checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Checker can view document in search template After checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Checker cannot see added file in search after checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that deleted documents do not appear in search for checker', async () => {
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
            await testClass.homeSteps.deleteFile(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
                if (isVisible) {
                    TestUtils.addBug(`Bug: Deleted file ${fileName} is visible to checker after deletion : ${document.documentType}`);
                }
                } catch (error) {
            TestUtils.addBug(`Bug: Deleted file is visible to checker in search after deletion document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that viewer can view document in search template After checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Maker cannot see added file in search after checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that viewer can not view document in search template before checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
            if (isVisible) {
                TestUtils.addBug(`Bug: Deleted file ${fileName} is visible to viewer before checker approval : ${document.documentType}`);
            }
                } catch (error) {
            TestUtils.addBug(`Bug: Veiwer can see added file in search before checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that deleted documents do not appear in search for viewer', async () => {
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
            await testClass.homeSteps.deleteFile(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(4);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
                if (isVisible) {
                    TestUtils.addBug(`Bug: Deleted file ${fileName} is visible to viewer after deletion : ${document.documentType}`);
                }
                } catch (error) {
            TestUtils.addBug(`Bug: Deleted file is visible to viewer in search after deletion document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Manager can view document in search template After checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            await testClass.homeSteps.clickPropertiesButton(fileName);
            await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, "Approved");
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(3);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            await testClass.homeSteps.verifyFileVisible(fileName);
                } catch (error) {
            TestUtils.addBug(`Bug: Manager cannot see added file in search after checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Manager can not view document in search template before checker approval', async () => {
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
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(3);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
            if (isVisible) {
                TestUtils.addBug(`Bug: file ${fileName} is visible to Manager before checker approval : ${document.documentType}`);
            }
                } catch (error) {
            TestUtils.addBug(`Bug: Manager can see added file in search before checker approval in document :  ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that deleted documents do not appear in search for Manager', async () => {
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
            await testClass.homeSteps.deleteFile(fileName);
            await testClass.homeSteps.logOut();
            await testClass.login.performLogin(3);
            await testClass.homeSteps.navigateToSearch();
            await testClass.search.searchDocument(document);
            const isVisible = await testClass.homeSteps.isFileVisible(fileName);
                if (isVisible) {
                    TestUtils.addBug(`Bug: Deleted file ${fileName} is visible to Manager after deletion : ${document.documentType}`);
                }
                } catch (error) {
            TestUtils.addBug(`Bug: Deleted file is visible to Manager in search after deletion document :  ${document.documentType} - ${error.message}`);
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
