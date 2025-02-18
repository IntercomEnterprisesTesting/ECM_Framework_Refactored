/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import {
     test as base, Browser, BrowserContext, Page,
    } from '@playwright/test';
import LoginPageSteps from '@uiSteps/LoginPageSteps';
import HomePageSteps from '@uiSteps/HomePageSteps';
import UIActions from '@uiActions/UIActions';
import UsersReader from 'Excel/usersReader';
import FolderNavigationUtil from '@utils/FolderNavigationUtil';
import { Folder } from 'Excel/types';
import DataBuilder from 'Excel/DataBuilder';
import AddDocumentPageSteps from '@uiSteps/AddDocumentPageSteps';
import AttributeUtil from '@utils/AttributeUtil';
import HomePage from '@pages/HomePage';
import PropertiesPageSteps from '@uiSteps/PropertiesPageSteps';
import CheckInPageSteps from '@uiSteps/CheckInPageSteps';

export default class TestBase {
     browser: Browser;
     context: BrowserContext;
     page: Page;
     login: LoginPageSteps;
     homeSteps: HomePageSteps;
     uiActions: UIActions;
     excel: DataBuilder;
     usersReader: UsersReader;
     folderNavigationUtil: FolderNavigationUtil;
     foldersMap: Map<string, Folder>;
     addDocument: AddDocumentPageSteps;
     attributeUtil: AttributeUtil;
     defaultFolder: string;
     properties: PropertiesPageSteps;
     checkIn: CheckInPageSteps;

    constructor() {
        base.beforeAll(async ({ browser }) => {
            this.browser = browser;
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
            this.excel = new DataBuilder();
            this.foldersMap = this.excel.getFoldersMap();
            this.defaultFolder = this.excel.getDefaultFolder();
            this.uiActions = new UIActions(this.page);
            this.folderNavigationUtil = new FolderNavigationUtil(this.uiActions, this.excel, this.page);
            this.usersReader = new UsersReader();
            this.attributeUtil = new AttributeUtil(this.page);
            this.login = new LoginPageSteps(this.page, this.uiActions, this.usersReader);
            this.addDocument = new AddDocumentPageSteps(this.uiActions, this.attributeUtil);
            this.homeSteps = new HomePageSteps(this.uiActions, this.folderNavigationUtil, this.addDocument);
            this.properties = new PropertiesPageSteps(this.uiActions, this.attributeUtil);
            this.checkIn = new CheckInPageSteps(this.uiActions, this.attributeUtil);
        });

        base.beforeEach(async () => {
            if (!this.context || this.context.pages().length === 0) {
                this.context = await this.browser.newContext();
                this.page = await this.context.newPage();
                this.uiActions = new UIActions(this.page);
                this.folderNavigationUtil = new FolderNavigationUtil(this.uiActions, this.excel, this.page);
                this.attributeUtil = new AttributeUtil(this.page);
                this.login = new LoginPageSteps(this.page, this.uiActions, this.usersReader);
                this.addDocument = new AddDocumentPageSteps(this.uiActions, this.attributeUtil);
                this.homeSteps = new HomePageSteps(this.uiActions, this.folderNavigationUtil, this.addDocument);
                this.properties = new PropertiesPageSteps(this.uiActions, this.attributeUtil);
                this.checkIn = new CheckInPageSteps(this.uiActions, this.attributeUtil);
            }
        });
    }

    public async clearFolders() {
        const docs = this.excel.getAllDocumentTypes();
        console.log(`docs = ${docs}`);
        for (const doc of docs) {
            try {
                await this.folderNavigationUtil.navigateToFolder(doc.folderName);
                const alertIsVisible = await this.uiActions.element(HomePage.FOLDER_IS_EMPTY_TEXT, "Folder is empty text").isVisible();
                if (!alertIsVisible) {
                    await this.homeSteps.deleteUploadedFiles();
                } 
            } catch (error) {
                console.log(`Error: ${error.message}`); 
            }
        }
    }

    // base.afterAll(async () => {
    //     await this.page.close();
    //     await this.context.close();
    // });
}
