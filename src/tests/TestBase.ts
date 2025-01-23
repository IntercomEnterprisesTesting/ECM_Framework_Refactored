import {
     test as base, Browser, BrowserContext, Page,
    } from '@playwright/test';
import LoginPageSteps from '@uiSteps/LoginPageSteps';
import HomePageSteps from '@uiSteps/HomePageSteps';
import UIActions from '@uiActions/UIActions';
import UsersReader from 'Excel/usersReader';
import FolderNavigationUtil from '@utils/FolderNavigationUtil';
import { Folder, DocumentClass } from 'Excel/types';
import DataBuilder from 'Excel/DataBuilder';
import AddDocumentPageSteps from '@uiSteps/AddDocumentPageSteps';
import AttributeUtil from '@utils/AttributeUtil';

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
        });

        // base.afterAll(async () => {
        //     await this.page.close();
        //     await this.context.close();
        // });
    }
}
