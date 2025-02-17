/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import Assert from "@asserts/Assert";
import AddDocumentPage from "@pages/AddDocumentPage";
import PropertiesPage from "@pages/PropertiesPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
import TestConstants from "@uiConstants/TestConstants";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";
import StringUtil from "@utils/StringUtil";
import TestUtils from "@utils/TestUtils";
import DataBuilder from "Excel/DataBuilder";
import { DocumentClass } from "Excel/types";

export default class PropertiesPageSteps {
    private uiActions: UIActions;
    private attributeUtil: AttributeUtil;
    private excel: DataBuilder;
    constructor(uiActions: UIActions, attributeUtil: AttributeUtil) {
        this.uiActions = uiActions;
        this.attributeUtil = attributeUtil;
        this.excel = new DataBuilder();
    }

    async updateDocumentStatus(value:string) {
        await this.uiActions.element(PropertiesPage.DOCUMENT_STATUS, "Document status").waitTillVisible(5);
        await this.uiActions.element(PropertiesPage.DOCUMENT_STATUS, "Document status").clear();
        await this.uiActions.editBox(PropertiesPage.DOCUMENT_STATUS, "Document status").fill(value);
    }

    async saveDocument() {
    await this.uiActions.element(PropertiesPage.SAVE_BUTTON, "Save button").waitTillVisible(5);
    await this.uiActions.element(PropertiesPage.SAVE_BUTTON, "Save button").isEnabled();
    await this.uiActions.element(PropertiesPage.SAVE_BUTTON, "Save button").click();
        } 

    async minimizeWindow() {
            await this.uiActions.element(PropertiesPage.MINIMIZE_BUTTON, "Minimize button").click();
         }

    async verifyDocumentVersion() {
        await this.uiActions.element(PropertiesPage.DOCUMENT_VERSION, "Document version").waitForPresent();
    }
}
