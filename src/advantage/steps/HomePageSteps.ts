/* eslint-disable max-len */
import Assert from "@asserts/Assert";
import HomePage from "@pages/HomePage";
import UIActions from "@uiActions/UIActions";
import FolderNavigationUtil from "@utils/FolderNavigationUtil";
import LinkUtil from "@utils/LinkUtil";
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
        // Wait for a specific element to be visible that indicates the page has fully loaded
        await this.uiActions.element(HomePage.FAVOURITES_BUTTON, "Home Page").isEnabled();
    }

    private async clickSideMenuButton() {
        await this.uiActions.element(HomePage.SIDE_MENU_BUTTON, "Side Menu Button").click();
    }
    private async clickBrowseButton() {
        await this.uiActions.element(HomePage.BROWSE_BUTTON, "Browse Button").click();
    }

    private async clickSearchButton() {
        await this.uiActions.element(HomePage.SEARCH_BUTTON, "Search Button").click();
    }

    private async verifyMenuIsOpened() {
        await this.uiActions.element(HomePage.OPENED_SIDE_MENU, "Opened Side Menu").waitTillVisible(5);
    }

    public async verifyFileAdded(fileName : string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await Assert.assertVisible(fileLinkLocator, `Link for ${fileName}`);
    } 

    private async deleteFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomePage.DELETE_BUTTON, "Actions Menu Button").click();
        await this.uiActions.element(HomePage.CONFIRM_DELETE_BUTTON, "Confirm Delete Button").click();
        await Assert.assertNull(fileLinkLocator, `Link for ${fileName}`);
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
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);    
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomePage.PROFILE_MENU_BUTTON, "Properties Button").click();
        await Assert.assertVisible(HomePage.PROPERTIES_WINDOW_DIV, "Properties Window");
        // return new propertiesPage(this.page)
    } 

    public async checkOutFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);    
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomePage.CHECK_OUT_BUTTON, "Check Out Button").hover();
        await this.uiActions.element(HomePage.CHECK_OUT_ONLY_BUTTON, "Check Out Button").click();
        await Assert.assertVisible(HomePage.CHECK_OUT_IMG, "Check Out Image");
    } 

    public async checkInFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomePage.CHECK_IN_BUTTON, "Check In Button").click();
        // return new checkInPage(this.page);
    }

    public async navigateToBrowse() {
        await this.waitForHomePageLoad();
        await this.clickSideMenuButton();
        const menuIsOpened = await this.uiActions.element(HomePage.OPENED_SIDE_MENU, "Opened side menu").isVisible(5);
        if (!menuIsOpened) {
            await this.clickSideMenuButton();
        }
        await this.verifyMenuIsOpened();
        // Wait for the side menu button to be visible
        // Click the side menu button
        await this.clickBrowseButton();
        // Click the browse button
    }

    public async navigateToSearch() {
    // Wait for the side menu button to be visible
        await this.waitForHomePageLoad();
    // Click the side menu button
        await this.clickSideMenuButton();
        const menuIsOpened = await this.uiActions.element(HomePage.OPENED_SIDE_MENU, "Opened side menu").isVisible(2);
        if (!menuIsOpened) {
            await this.clickSideMenuButton();
        }
    // verify menu is opened
        await this.verifyMenuIsOpened();
    // Click the search button
        await this.clickSearchButton();
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
    
    public async addDocumentUsingDocumentType(documentName: string) {
        await this.folderNavigation.navigateToDocumentFolder(documentName);
        await this.clickAddDocumentButton();
        await this.addDocumentSteps.selectEntryTemplate(documentName);
    }
    
    public async navigateToDocumentFolder(folderName: string) {
        await this.folderNavigation.navigateToFolder(folderName);
    }

    public async clickAddDocumentButton() {
        await this.uiActions.element(HomePage.ADD_DOCUMENT_BUTTON, "Add Document Button").click();
        await this.uiActions.element(HomePage.ADD_DOCUMENT_WINDOWS_DIV, "Add Document Window").isVisible(60);
    }

    public async getTestFileSelector() {
        return HomePage.TEST_FILE_SELECTOR;
    }
}
