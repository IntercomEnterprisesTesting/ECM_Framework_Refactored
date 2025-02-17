/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { test } from '@playwright/test';
import TestUtils from '@utils/TestUtils';
import HomePage from '@pages/HomePage';
import TestBase from './TestBase';

class FolderTests extends TestBase {
    constructor() {
        super();
    }
}

const testClass = new FolderTests();

test.describe('[Folder Specs tests]', () => {
    test.beforeAll(async () => {
        await testClass.login.launchApplication();
        await testClass.login.performLogin(1);
        await testClass.homeSteps.navigateToBrowse();
    });

    test.beforeEach(() => {
        TestUtils.clearWarnings();
    });

    test('Verify that folder structure is correct (Static folders)', async () => {
    const folders: string[] = testClass.excel.getLowLevelFolders();
    // eslint-disable-next-line no-restricted-syntax
    for (const folderName of folders) {
        await test.step(`Navigate to ${folderName}`, async () => {    
            try {
                await testClass.folderNavigationUtil.navigateToFolder(folderName);
                await testClass.folderNavigationUtil.assertFolderIsOpened(folderName);
            } catch (error) {
                TestUtils.addWarning(`Warning: Failed to navigate to document folder ${folderName} - ${error.message}`);
            }
        });
    }
    TestUtils.checkWarnings();
});

test('Verify that Documents cannot be added under these folders level directly', async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [folderName, folder] of testClass.foldersMap) {
        if (folder.canAdd === false) {
            await test.step(`Navigate to ${folderName}`, async () => {    
                try {
                    await testClass.folderNavigationUtil.navigateToFolder(folderName);
                    await testClass.folderNavigationUtil.assertFolderIsOpened(folderName);
                    const isDisabled = await testClass.uiActions.element(HomePage.ADD_DOCUMENT_BUTTON, "add document button").isDisabled();
                    if (isDisabled === false) {
                      TestUtils.addWarning(`Warning: user can add files under folder ${folderName} while he should not`);
                    }
                } catch (error) {
                    TestUtils.addWarning(`Warning: user can add files under folder ${folderName} while he should not - ${error.message}`); 
                }
            });
        } else {
            await test.step(`Navigate to ${folderName}`, async () => {    
                try {
                    await testClass.folderNavigationUtil.navigateToFolder(folderName);
                    await testClass.folderNavigationUtil.assertFolderIsOpened(folderName);
                    const isEnabled = await testClass.uiActions.element(HomePage.ADD_DOCUMENT_BUTTON, "add document button").isEnabled();
                    if (isEnabled === false) {
                        TestUtils.addWarning(`Warning: user cannot add files under folder ${folderName} while he should`);
                }
                    } catch (error) {
                    TestUtils.addWarning(`Warning: user cannot add files under folder ${folderName} while he should - ${error.message}`); 
                }
            });
        }
        }
    TestUtils.checkWarnings();
});

  test.afterAll(async () => {
    await testClass.page.close();
});
});
