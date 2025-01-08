import Assert from "@asserts/Assert";
import HomaPage from "@pages/HomePage";
import { Page } from "@playwright/test";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import LinkUtil from "@utils/LinkUtil";

export default class HomePageSteps {
    private uiActions: UIActions;

    constructor(private page: Page) {
        this.uiActions = new UIActions(page);
    }
    private async waitForHomePageLoad() {
        // Wait for a specific element to be visible that indicates the page has fully loaded
        await this.uiActions.element(HomaPage.FAVOURITES_BUTTON, "Home Page").isEnabled();
    }
    private async clickSideMenuButton() {
        await this.uiActions.element(HomaPage.SIDE_MENU_BUTTON, "Side Menu Button").click();
    }
    private async clickBrowseButton() {
        await this.uiActions.element(HomaPage.BROWSE_BUTTON, "Browse Button").click();
    }
    private async clickSearchButton() {
        await this.uiActions.element(HomaPage.SEARCH_BUTTON, "Search Button").click();
    }
    private async verifyMenuIsOpened() {
        await this.uiActions.element(HomaPage.OPENED_SIDE_MENU, "Opened Side Menu").waitTillVisible(5);
}

    public async verifyFileAdded(fileName : string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await Assert.assertVisible(fileLinkLocator, `Link for ${fileName}`);
    } 

    private async deleteFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomaPage.DELETE_BUTTON, "Actions Menu Button").click();
        await this.uiActions.element(HomaPage.CONFIRM_DELETE_BUTTON, "Confirm Delete Button").click();
        await Assert.assertNull(fileLinkLocator, `Link for ${fileName}`);
    } 
    public async deleteUploadedFiles() {
        await this.uiActions.element(HomaPage.SELECT_ALL_CHECKBOX, "Select All Checkbox").click();
        await this.uiActions.element(HomaPage.ACTIONS_MENU_BUTTON, "Actions Menu Button").click();
        await this.uiActions.element(HomaPage.DELETE_BUTTON, "Delete Button").click();
        await this.uiActions.element(HomaPage.CONFIRM_DELETE_BUTTON, "Confirm Delete Button").click();
    } 
    public async logOut() {
        await this.uiActions.element(HomaPage.PROFILE_MENU_BUTTON, "Profile Menu").click();
        await this.uiActions.element(HomaPage.LOGOUT_BUTTON, "Log Out Button").click();
        await this.uiActions.element(HomaPage.CONFIRM_LOGOUT_BUTTON, "Confirm Logout Button").click();
    }
    public async clickPropertiesButton(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);    
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomaPage.PROFILE_MENU_BUTTON, "Properties Button").click();
        await Assert.assertVisible(HomaPage.PROPERTIES_WINDOW_DIV, "Properties Window");
        // return new propertiesPage(this.page)
        } 
    public async checkOutFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);    
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomaPage.CHECK_OUT_BUTTON, "Check Out Button").hover();
        await this.uiActions.element(HomaPage.CHECK_OUT_ONLY_BUTTON, "Check Out Button").click();
        await Assert.assertVisible(HomaPage.CHECK_OUT_IMG, "Check Out Image");
        } 
    public async checkInFile(fileName: string) {
        const fileLinkLocator = LinkUtil.getLinkSelector(fileName);
        await this.uiActions.element(fileLinkLocator, `Link for ${fileName}`).rightClick();
        await this.uiActions.element(HomaPage.CHECK_IN_BUTTON, "Check In Button").click();
        // return new checkInPage(this.page);
    }
    public async navigateToBrowse() {
        // Wait for the side menu button to be visible
        await this.waitForHomePageLoad();
        // Click the side menu button
        await this.clickBrowseButton();
        await this.verifyMenuIsOpened();
        // Click the browse button
        await this.clickBrowseButton();
    }
    public async navigateToSearch() {
    // Wait for the side menu button to be visible
        await this.waitForHomePageLoad();
    // Click the side menu button
        await this.clickSideMenuButton();
    // verify menu is opened
        await this.verifyMenuIsOpened();
    // Click the search button
        await this.clickSearchButton();
    // verify search Feild is displayed
        await this.uiActions.element(HomaPage.SEARCH_TEXTBOX, "Search Field").waitTillVisible(5);
    // return new searchPage (this.page);
    }
    public async navigateToAddDocumentPage() {
        await this.clickSideMenuButton();
        await this.clickBrowseButton();
        await this.uiActions.element(HomaPage.ADD_DOCUMENT_BUTTON, "Add Document Button").click();
        // expect the add document window to be displayed
        await this.uiActions.element(HomaPage.ADD_DOCUMENT_WINDOWS_DIV, "Add Document Window").waitTillVisible(5);
        // return new addwindowpage
    }
}
