/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import { DocumentClass } from 'Excel/types';
import StringUtil from '@utils/StringUtil';
import TestBase from './TestBase';

class SecurityMatrix extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new SecurityMatrix();   

test.describe('[Folder Specs tests]', () => {
    test.beforeAll(async () => {
        await testClass.login.launchApplication();
    });

    test('Verify that maker can add document', async () => {
            const documents: DocumentClass[] = testClass.excel.getAllDocumentTypes();
            await testClass.login.performLogin(1);
            await testClass.homeSteps.navigateToBrowse();
                for (const document of documents) {
                    try {
            await testClass.homeSteps.openAddDoc(document);
            const fileName = await testClass.addDocument.addDocument(document);
            await testClass.homeSteps.verifyFileAdded(fileName);
                } catch (error) {
            TestUtils.addWarning(`Warning: Failed to add docuemnt ${document.documentType} - ${error.message}`);
        } 
    }
            TestUtils.checkWarnings();
      });
});
