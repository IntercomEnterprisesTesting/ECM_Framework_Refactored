/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import PropertiesPage from "@pages/PropertiesPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";
import DataBuilder from "Excel/DataBuilder";

export default class PropertiesPageSteps {
    private uiActions: UIActions;
    private attributeUtil: AttributeUtil;
    private excel: DataBuilder;
    constructor(uiActions: UIActions, attributeUtil: AttributeUtil) {
        this.uiActions = uiActions;
        this.attributeUtil = attributeUtil;
        this.excel = new DataBuilder();
    }

    public async updateDocumentStatus(value:string) {
        const Status = await this.attributeUtil.createAttributeInputSelector(PropertiesPage.DOCUMENT_STATUS);
        await this.uiActions.element(Status, "Document status").waitTillVisible(5);
        await this.uiActions.element(Status, "Document status").clear();
        await this.uiActions.editBox(Status, "Document status").fill(value);
        await this.saveDocument();
    }

    public async saveDocument() {
    await this.uiActions.element(PropertiesPage.SAVE_BUTTON, "Save button").waitTillVisible(5);
    await this.uiActions.element(PropertiesPage.SAVE_BUTTON, "Save button").isEnabled();
    await this.uiActions.element(PropertiesPage.SAVE_BUTTON, "Save button").click();
        } 

    public async minimizeWindow() {
            await this.uiActions.element(PropertiesPage.MINIMIZE_BUTTON, "Minimize button").click();
         }

    public async verifyDocumentVersion() {
        await this.uiActions.element(PropertiesPage.DOCUMENT_VERSION, "Document version").waitForPresent();
    }

    public async clickCancelButton() {
        await this.uiActions.element(PropertiesPage.CANCEL_BUTTON, "Cancel button").click();
    }
}
