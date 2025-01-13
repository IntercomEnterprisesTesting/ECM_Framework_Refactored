import {
     test as base, Browser, BrowserContext, Page,
    } from '@playwright/test';
import LoginPageSteps from '@uiSteps/LoginPageSteps';
import HomePageSteps from '@uiSteps/HomePageSteps';
import UIActions from '@uiActions/UIActions';
import ExcelDataProcessor from 'excelProcessor/excelDateProcessor';
import FolderProcessor from 'excelProcessor/FolderProcessor';
import UsersReader from 'excelProcessor/usersReader';
import FolderNavigationUtil from '@utils/FolderNavigationUtil';

export default class TestBase {
     browser: Browser;
     context: BrowserContext;
     page: Page;
     login: LoginPageSteps;
     home: HomePageSteps;
     uiActions: UIActions;
     excel: ExcelDataProcessor;
     folderProcessor: FolderProcessor;
     usersReader: UsersReader;
     folderNavigationUtil: FolderNavigationUtil;

    constructor() {
        base.beforeAll(async ({ browser }) => {
            this.browser = browser;
            this.context = await this.browser.newContext();
            this.page = await this.context.newPage();
            this.excel = new ExcelDataProcessor();
            const defaultFolder = this.excel.getDefaultFolder();
            console.log(`Default folder is ${defaultFolder}`);
            this.uiActions = new UIActions(this.page);
            this.folderNavigationUtil = new FolderNavigationUtil(this.uiActions, this.excel);
            this.usersReader = new UsersReader();
            this.folderProcessor = new FolderProcessor();
            this.login = new LoginPageSteps(this.page, this.uiActions, this.usersReader);
            this.home = new HomePageSteps(this.uiActions, this.folderNavigationUtil);
        });

        // base.afterAll(async () => {
        //     await this.page.close();
        //     await this.context.close();
        // });
    }
}
