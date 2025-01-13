/* eslint-disable max-len */
import Assert from "@asserts/Assert";
import AddDocumentPage from "@pages/AddDocumentPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";

export default class AddDocumentPageSteps {
    private uiActions: UIActions;
    private attributeUtil: AttributeUtil;
    constructor(uiActions: UIActions, attributeUtil: AttributeUtil) {
        this.uiActions = uiActions;
        this.attributeUtil = attributeUtil;
    }

    async clickUploadFileButton() {
        await this.uiActions.element(AddDocumentPage.UPLOAD_FILE_BUTTON, "Upload File Button").click();
    }
    
    async fillTextAttribute(attibuteName : string, value:string) {
        const attributeLocator = this.attributeUtil.getAttributeSelector(attibuteName);
        await this.uiActions.editBox(attributeLocator, attibuteName).fill(value);
    }
    async fillInputAttribute(attibuteName : string, value:string) {
        const attributeSelector = await this.attributeUtil.createAttributeInputSelector(attibuteName);
        await this.uiActions.editBox(attributeSelector, attibuteName).fill(value);
    }
    async uploadFile(filePath:string) {
        await this.uiActions.element(AddDocumentPage.FILE_INPUT, "file input").setInputFiles(filePath);
        } 
    async confirmAddFile() {
        // eslint-disable-next-line max-len
        await this.uiActions.element(AddDocumentPage.ADD_FILE_BUTTON, "Confirm Add File Button").scrollIntoView();
        await this.uiActions.element(AddDocumentPage.ADD_FILE_BUTTON, "Confirm Add File Button").click();
         } 
    public async verifyVisibilityOfAttributes(attributeName :string) {
            const attribute = await this.attributeUtil.createAttributeInputLocator(attributeName);
            await Assert.assertVisible(attribute, `Attribute ${attributeName}`);
        }
    async minimizeWindow() {
            await this.uiActions.element(AddDocumentPage.MINIMIZE_BUTTON, "Minimize Button").click();
        }
    public async selectEntryTemplate(entryTemplate: string) {
            const entryTemplateAttribute = await this.attributeUtil.createAttributeInputSelector("Entry Template");
            await this.uiActions.editBox(entryTemplateAttribute, "Entry Template").fill(entryTemplate);
        }
    public async fillTextBoxAttribute(attribute: string, value: string) {
            const attributeLocator = await this.attributeUtil.createAttributeInputSelector(attribute);
            await this.uiActions.editBox(attributeLocator, attribute).fill(value);
        }
}
