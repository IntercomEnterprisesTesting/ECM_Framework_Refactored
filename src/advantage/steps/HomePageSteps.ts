/* eslint-disable max-len */
import HomePage from "@pages/HomePage";
import UIActions from "@uiActions/UIActions";
import FolderNavigationUtil from "@utils/FolderNavigationUtil";
import LinkUtil from "@utils/LinkUtil";
import TestUtils from "@utils/TestUtils";
import { DocumentClass } from "Excel/types";
import AddDocumentPageSteps from "./AddDocumentPageSteps";

export default class HomePageSteps {
    private uiActions: UIActions;
    private folderNavigation: FolderNavigationUtil;
    private addDocumentSteps: AddDocumentPageSteps;

    constructor(uiActions: UIActions, folderNavigation: FolderNavigationUtil, addDocumentSteps: AddDocumentPageSteps) {
        this.uiActions = uiActions;
        this.folderNavigation = folderNavigation;
        this.addDocumentSteps = addDocumentSteps;
    }

    private async waitForHomePageLoad() {
        await this.uiActions.waitForDomContentLoaded();
        // Wait for a specific element to be visible that indicates the page has fully loaded
        await this.uiActions.element(HomePage.FAVOURITES_BUTTON, "Home Page").waitTillVisible(5);
        await this.uiActions.element(HomePage.FAVOURITES_BUTTON, "Home Page").waitForEnabled(5);
    }

    private async clickSideMenuButton() {
        // await this.waitForHomePageLoad();
       //  await this.uiActions.element(HomePage.FEATURES_MENU, "Features Menu Button").waitTillVisible(5);
        await this.uiActions.element(HomePage.SIDE_MENU_BUTTON, "Side Menu Button").waitForEnabled();
        await this.uiActions.element(HomePage.SIDE_MENU_BUTTON, "Side Menu Button").jsClick();
       //  await this.uiActions.keyPress("Enter", "Enter Key");
       // await this.uiActions.pauseInSecs(3);
        // await this.verifyMenuIsOpened();
    }
    private async clickBrowseButton() {
        await this.clickSideMenuButton();
        await this.uiActions.waitForDomContentLoaded();
        await this.uiActions.element(HomePage.BROWSE_BUTTON, "Browse Button").jsClick();
       // await this.uiActions.keyPress("Enter", "Enter Key");
        // await this.uiActions.element(HomePage.BROWSE_BUTTON, "Browse Button").click();
        await this.uiActions.element(HomePage.TOTAL_COUNT, "Total count dev").waitTillVisible(5);
    }

    private async clickSearchButton() {
        await this.uiActions.element(HomePage.SEARCH_BUTTON, "Search Button").click();
    }

    private async verifyMenuIsOpened() {
        await this.uiActions.element(HomePage.OPENED_SIDE_MENU, "Opened Side Menu").waitTillVisible(5);
        const menuIsOpened = await this.uiActions.element(HomePage.OPENED_SIDE_MENU, "Opened side menu").isVisible(5);
        if (!menuIsOpened) {
            await this.clickSideMenuButton();
        }
    }

    public async verifyFileVisible(fileName : string) {
        const fileLinkSelector = LinkUtil.getLinkSelector(fileName);
        try {
            await this.uiActions.element(fileLinkSelector, `file: ${fileName}`).waitTillVisible(5);
        } catch (error) {
            TestUtils.addBug(`File ${fileName} not added`);
            throw new Error();
        }
        }
// return boolean value
    public async isFileVisible(fileName : string) :Promise<boolean> {
            const fileLinkSelector = LinkUtil.getLinkSelector(fileName);
                const isVisible = await this.uiActions.element(fileLinkSelector, `file: ${fileName}`).isVisible(5);
                return isVisible;
            } 

    public async openActionMenu(fileName: string) {
            const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
            await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
            return fileLinkLocator;
        } 

    public async deleteFile(fileName: string) {
        const fileLinkLocator = await this.openActionMenu(fileName);
        await this.uiActions.element(HomePage.DELETE_BUTTON, "Actions Menu Button").click();
        await this.uiActions.element(HomePage.CONFIRM_DELETE_BUTTON, "Confirm Delete Button").click();
        // const count = await this.uiActions.element(fileLinkLocator, "File").getCount();
        // Assert.assertEquals(0, count, "Add document page ");
    } 

    public async deleteUploadedFiles() {
        await this.uiActions.element(HomePage.SELECT_ALL_CHECKBOX, "Select All Checkbox").click();
        await this.uiActions.element(HomePage.ACTIONS_MENU_BUTTON, "Actions Menu Button").click();
        await this.uiActions.element(HomePage.DELETE_BUTTON, "Delete Button").click();
        await this.uiActions.element(HomePage.CONFIRM_DELETE_BUTTON, "Confirm Delete Button").click();
    } 

    public async logOut() {
        await this.uiActions.element(HomePage.PROFILE_MENU_BUTTON, "Profile Menu").click();
        await this.uiActions.element(HomePage.LOGOUT_BUTTON, "Log Out Button").click();
        await this.uiActions.element(HomePage.CONFIRM_LOGOUT_BUTTON, "Confirm Logout Button").click();
    }

    public async clickPropertiesButton(fileName: string) {
        await this.openActionMenu(fileName);
        await this.uiActions.element(HomePage.PROPERTIES_BUTTON, "Properties Button").click();
        await this.uiActions.waitForDomContentLoaded();
        await this.uiActions.element(HomePage.PROPERTIES_WINDOW_DIV, "Properties Window").waitTillVisible(5);
    } 

    public async checkOutFile(fileName: string) {
        await this.openActionMenu(fileName);
        await this.uiActions.element(HomePage.CHECK_OUT_BUTTON, "Check Out Button").hover();
        await this.uiActions.element(HomePage.CHECK_OUT_ONLY_BUTTON, "Check Out Button").click();
        await this.uiActions.element(HomePage.CHECK_OUT_IMG, "Check Out Img").isVisible();
        await this.uiActions.waitForDomContentLoaded();
    } 

    public async checkInFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomePage.CHECK_IN_BUTTON, "Check In Button").click();
        await this.uiActions.waitForDomContentLoaded();
        // return new checkInPage(this.page);
    }

    public async navigateToBrowse() {
        await this.waitForHomePageLoad();
       // await this.clickSideMenuButton();
        // await this.uiActions.element(HomePage.SIDE_MENU_LOADED, "Browse Button").waitTillVisible(5);
        // await this.uiActions.waitForDomContentLoaded();
        // await this.verifyMenuIsOpened();
        // await this.uiActions.waitForDomContentLoaded();
        await this.clickBrowseButton();
        // await this.uiActions.waitForDomContentLoaded();
        // Click the browse button
    }

    public async navigateToSearch() {
    // Click the side menu button
        await this.clickSideMenuButton();
        await this.uiActions.waitForDomContentLoaded();
        const menuIsOpened = await this.uiActions.element(HomePage.OPENED_SIDE_MENU, "Opened side menu").isVisible(2);
        if (!menuIsOpened) {
            await this.clickSideMenuButton();
        }
    // verify menu is opened
        await this.verifyMenuIsOpened();
        await this.uiActions.waitForDomContentLoaded();
    // Click the search button
        await this.clickSearchButton();
        await this.uiActions.waitForDomContentLoaded();
    // verify search Feild is displayed
        await this.uiActions.element(HomePage.SEARCH_TEXTBOX, "Search Field").waitTillVisible(5);
    // return new searchPage (this.page);
    }

    public async addDocumentUsingFolder(folderName: string) {
        await this.folderNavigation.navigateToFolder(folderName);
        await this.uiActions.element(HomePage.ADD_DOCUMENT_BUTTON, "Add Document Button").click();
        // expect the add document window to be displayed
        await this.uiActions.element(HomePage.ADD_DOCUMENT_WINDOWS_DIV, "Add Document Window").waitTillVisible(5);
    }
    
    public async openAddDoc(documentClass: DocumentClass) {
        await this.folderNavigation.navigateToDocumentFolder(documentClass.documentType);
        await this.clickAddDocumentButton(documentClass);
        await this.uiActions.pauseInSecs(2);
    }
    
    // public async navigateToDocumentFolder(folderName: string) {
    //     await this.folderNavigation.navigateToFolder(folderName);
    // }

    public async clickAddDocumentButton(documentClass: DocumentClass) {
        await this.uiActions.element(HomePage.ADD_DOCUMENT_BUTTON, "Add Document Button").click();
        await this.uiActions.element(HomePage.ADD_DOCUMENT_WINDOWS_DIV, "Add Document Window").isVisible(60);
        // await this.uiActions.waitForDomContentLoaded();
        await this.addDocumentSteps.selectEntryTemplate(documentClass.documentType);
    }

    public async getTestFileSelector() {
        return HomePage.TEST_FILE_SELECTOR;
    }

    public async isDocEditable(fileName: string) : Promise<boolean> {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        const isCollapsed = await this.uiActions.element(HomePage.PROPERTIES_DIV_BTN, "Properties button").isVisible(5);
        if (isCollapsed) {
            await this.uiActions.element(HomePage.PROPERTIES_DIV_BTN, "Properties button").click();
        }
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomePage.ACTION_MENU, "Edit Button").isVisible();
        await this.uiActions.waitForDomContentLoaded();
        await this.uiActions.element(HomePage.PROPERTIES_DIV, "Edit Button").waitTillVisible(5);
        const isVisible = await this.uiActions.element(HomePage.EDIT_BTN, "Edit Button").isVisible(5);
        return isVisible;
    }

    public async isDeleteButtonEnabled(fileName: string) : Promise<boolean> {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        const isEnabled = await this.uiActions.element(HomePage.DELETE_BUTTON, "Delete Button").isEnabled();
        return isEnabled;
    }

    public async checkAddButtonEnabled() : Promise<boolean> {
        const isEnabled = await this.uiActions.element(HomePage.ADD_DOCUMENT_BUTTON, "Add Document Button").isEnabled();
        return isEnabled;
    }
}
