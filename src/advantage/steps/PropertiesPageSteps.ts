/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import PropertiesPage from "@pages/PropertiesPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";
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

    public async updateAttrAndSave(attribute:string, value:string) {
        const Status = await this.attributeUtil.createAttributeInputSelector(attribute);
        await this.uiActions.element(Status, `${attribute}`).waitTillVisible(5);
        await this.uiActions.element(Status, `${attribute}`).clear();
        await this.uiActions.editBox(Status, `${attribute}`).fill(value);
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

    public async checkAttrValue(attribute:string) {
        const StatusSelector = await this.attributeUtil.createAttributeInputSelector(attribute);
        const statusValueSelector = `${StatusSelector}/following-sibling::input`;
        const value = await this.uiActions.element(statusValueSelector, "Document status value").getAttribute(`value`);
        return value;
    }

    public async verifyAttributesEnabled(document: DocumentClass) {
        for (const attribute of document.attributes) {
            const attributeSelector = await this.attributeUtil.createAttributeInputSelector(attribute.attributeName);
            await this.uiActions.element(attributeSelector, `${attribute}`).isEnabled();
        }
    }
}
