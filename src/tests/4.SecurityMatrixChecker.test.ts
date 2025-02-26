/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import PropertiesPage from '@pages/PropertiesPage';
import TestBase from './TestBase';

class SecurityMatrixChecker extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SecurityMatrixChecker();   

test.describe('[Security matrix - Checker]', () => {
    test.beforeEach(async () => {
        TestUtils.clearBugs(); // Create a new page
        await testClass.launchApplication();
    });

    test.afterEach(async () => {
        await testClass.context.close(); // Close the page after resolving bugs
        await TestUtils.checkBugs(); // Ensure bugs are resolved before closing the page
    });

    test('Verify that Checker cannot add document', async () => {
        const document = testClass.excel.getDefaultDocument();
            await testClass.login.performLogin(2);
            await testClass.homeSteps.navigateToBrowse();
                    try {
            await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
            const isEnabled = await testClass.homeSteps.checkAddButtonEnabled();
                if (isEnabled) {
                    TestUtils.addBug(`Bug : Checker can add document ${document.documentType}`);
                    }
                } catch (error) {
            TestUtils.addBug(`Bug: Checker can add document ${document.documentType} - ${error.message}`);
        } 
    });

    test('Verify that Checker cannot delete document', async () => {
           const document = testClass.excel.getDefaultDocument();
           await testClass.login.performLogin(1);
           await testClass.homeSteps.navigateToBrowse();
                   try {
           await testClass.homeSteps.openAddDoc(document);
           const fileName = await testClass.addDocument.addDocument(document);
           await testClass.homeSteps.verifyFileVisible(fileName);
           await testClass.homeSteps.logOut();
           await testClass.login.performLogin(2);
           await testClass.homeSteps.navigateToBrowse();
           await testClass.folderNavigationUtil.navigateToDocumentFolder(document.documentType);
           const enabled = await testClass.homeSteps.isDeleteButtonEnabled(fileName);
                   if (enabled) {
                    TestUtils.addBug(`Bug : Delete button is enabled for ${document.documentType} while it should not be`);
                   }
               } catch (error) {
           TestUtils.addBug(`Bug: Checker can delete docuemnt ${document.documentType} - ${error.message}`);
       } 
    });

    test('Verify that Checker can update document status from Not approved to approved', async () => {
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
               const newStatus = "Approved";
               await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, newStatus);
               await testClass.homeSteps.clickPropertiesButton(fileName);
               const status = await testClass.properties.checkAttrValue(PropertiesPage.DOCUMENT_STATUS);
               await testClass.properties.clickCancelButton();
                if (status !== newStatus) {
                    TestUtils.addBug(`Bug :Expected status to be ${newStatus} but got ${status}`);
        }
                   } catch (error) {
               TestUtils.addBug(`Bug: Maker Failed to update docuemnt ${document.documentType} status from Not approved to Approved  - ${error.message}`);
           } 
    });

    test('Verify that Checker can update document status from Not approved to Rejected', async () => {
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
                const newStatus = "Rejected";
                await testClass.properties.updateAttrAndSave(PropertiesPage.DOCUMENT_STATUS, newStatus);
                await testClass.homeSteps.clickPropertiesButton(fileName);
                const status = await testClass.properties.checkAttrValue(PropertiesPage.DOCUMENT_STATUS);
                await testClass.properties.clickCancelButton();
                 if (status !== newStatus) {
                    TestUtils.addBug(`Bug :Expected status to be ${newStatus} but got ${status}`);
         }
                    } catch (error) {
                TestUtils.addBug(`Bug: Checker Failed to update docuemnt ${document.documentType} status from Not approved to Rejected - ${error.message}`);
            } 
    });

    test('Verify that Checker can not update document attributes after checker approval', async () => {
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
                await testClass.homeSteps.clickPropertiesButton(fileName);
                await testClass.attributeUtil.checkAttrAreDisabledForDocClass(document);
                await testClass.properties.clickCancelButton();
                } catch (error) {
                TestUtils.addBug(`Bug: Checker can update docuemnt ${document.documentType} attributes after checker approval- ${error.message}`);
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
