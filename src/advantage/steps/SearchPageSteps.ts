/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import PropertiesPage from "@pages/PropertiesPage";
import SearchPage from "@pages/SearchPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";
import DataBuilder from "Excel/DataBuilder";
import { DocumentClass } from "Excel/types";

export default class SearchPageSteps {
    private uiActions: UIActions;
    private attributeUtil: AttributeUtil;
    private excel: DataBuilder;
    constructor(uiActions: UIActions, attributeUtil: AttributeUtil) {
        this.uiActions = uiActions;
        this.attributeUtil = attributeUtil;
        this.excel = new DataBuilder();
    }

    public async waitForSearchPageToLoad() {
        // Wait for a specific element to be visible that indicates the page has fully loaded
        await this.uiActions.element(SearchPage.ALL_SEARCHES_SIDE_MENU_BUTTON, "Search Side Menu button").waitForEnabled();
      }

      public async clickSideMenuButton() {
        await this.uiActions.element(SearchPage.SIDE_MENU_BUTTON, "Side menu button").waitTillVisible(5);
        await this.uiActions.element(SearchPage.SIDE_MENU_BUTTON, "Side menu button").click();
    }

    private async clickBrowseButton() {
        await this.uiActions.waitForDomContentLoaded();
        await this.uiActions.element(SearchPage.BROWSE_BUTTON, "Browse Button").click();
    }

    async clickSearchSideMenuButton() {
        await this.uiActions.element(SearchPage.SIDE_MENU_SEARCH_BUTTON, "Search Side Menu Button").waitTillVisible(5);
        await this.uiActions.element(SearchPage.SIDE_MENU_SEARCH_BUTTON, "Search Side Menu Button").click();
    }

    private getExpandButtonForMenuItem(Selector: string) {
        const precedingXPath = '//preceding::span[@data-dojo-attach-point="expandoNode"][1]';
        return `${Selector}${precedingXPath}`;
    }

    private getSearchTemplateLocator(documentName: DocumentClass, selector: string) {
        const following = `//following::span[text()="${documentName.documentType}"][1]`;
        return `${selector}${following}`;
    }

    public async expandSearchButton() {
        const buttonLocator = this.getExpandButtonForMenuItem(SearchPage.ALL_SEARCHES_SIDE_MENU_BUTTON);
        await this.uiActions.element(buttonLocator, "All Search Expand button").click();
    }

    public async clickDocumentSearchTemplate(documentName: DocumentClass) {
        const searchTemplateLocator = this.getSearchTemplateLocator(documentName, SearchPage.ALL_SEARCHES_SIDE_MENU_BUTTON);
        await this.uiActions.element(searchTemplateLocator, `Search Tamplate for document ${documentName.documentType}`).click();
        await this.uiActions.element(SearchPage.SELECT_OPERATOR_SELECTOR, "Select operator field").waitTillVisible(5);
    }

    public async clickSearchButton() {
        await this.uiActions.element(SearchPage.SEARCH_BUTTON, "Search Button").click();
    }

    public async searchDocument(documentName: DocumentClass) {
        await this.expandSearchButton();
        await this.clickDocumentSearchTemplate(documentName);
        await this.clickSearchButton();
    }
}
