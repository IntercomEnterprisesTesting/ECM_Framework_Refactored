/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import HomePage from '@pages/HomePage';
import AddDocumentPage from '@pages/AddDocumentPage';
import TestBase from './TestBase';

class SecurityMatrix extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SecurityMatrix();   

test.describe('[Security matrix]', () => {
    test.beforeAll(async () => {
        await testClass.login.launchApplication();
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
            await testClass.homeSteps.verifyFileAdded(fileName);
                } catch (error) {
            TestUtils.addWarning(`Warning: Failed to add docuemnt ${document.documentType} - ${error.message}`);
        } 
    
            await testClass.homeSteps.logOut();
            TestUtils.checkWarnings();
      });

      test('Verify that maker can delete document before checker approval', async () => {
        const document = testClass.excel.getDefaultDocument();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
                try {
        await testClass.homeSteps.openAddDoc(document);
        const fileName = await testClass.addDocument.addDocument(document);
        await testClass.homeSteps.verifyFileAdded(fileName);
        await testClass.homeSteps.openActionMenu(fileName);
        await testClass.uiActions.element(HomePage.DELETE_BUTTON, "Delete Button").isEnabled();
            } catch (error) {
        TestUtils.addWarning(`Warning: Failed to delete docuemnt ${document.documentType} - ${error.message}`);
    } 
         await testClass.homeSteps.logOut();
         TestUtils.checkWarnings();
  });

  test('Verify that maker can view document attributes after checker approval', async () => {
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
    await testClass.properties.updateDocumentStatus("Approved");
    await testClass.homeSteps.logOut();
    await testClass.login.performLogin(1);
    await testClass.homeSteps.navigateToBrowse();
    await testClass.homeSteps.navigateToDocumentFolder(document.documentType);
    await testClass.homeSteps.clickPropertiesButton(fileName);
    await testClass.attributeUtil.checkAttributesForDocumentType(document);
    await testClass.properties.clickCancelButton();
        } catch (error) {
    TestUtils.addWarning(`Bug: Failed to view docuemnt ${document.documentType} attributes - ${error.message}`);
} 
     await testClass.homeSteps.logOut();
     TestUtils.checkWarnings();
});

//   test.afterAll(async () => {
//     await testClass.login.performLogin(0);
//     await testClass.homeSteps.navigateToBrowse();
//     await testClass.clearFolders();
//     await testClass.context.close();
// });
});
