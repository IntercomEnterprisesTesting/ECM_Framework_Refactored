/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import Assert from "@asserts/Assert";
import AddDocumentPage from "@pages/AddDocumentPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
import TestConstants from "@uiConstants/TestConstants";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";
import DataBuilder from "Excel/DataBuilder";

export default class AddDocumentPageSteps {
    private uiActions: UIActions;
    private attributeUtil: AttributeUtil;
    private excel: DataBuilder;
    constructor(uiActions: UIActions, attributeUtil: AttributeUtil) {
        this.uiActions = uiActions;
        this.attributeUtil = attributeUtil;
        this.excel = new DataBuilder();
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
    public async setUploadFilePath() {
        await this.uiActions.element(AddDocumentPage.FILE_INPUT, "file input").setInputFiles(TestConstants.TEST_FILE_PATH);
        } 
    public async clickAddButton() {
        // eslint-disable-next-line max-len
        await this.uiActions.element(AddDocumentPage.ADD_FILE_BUTTON, "Confirm Add File Button").click();
         } 
    public async verifyVisibilityOfAttribute(attributeName :string) {
            const attribute = await this.attributeUtil.createAttributeInputLocator(attributeName);
            await Assert.assertVisible(attribute, `Attribute ${attributeName}`);
        }
    public async minimizeWindow() {
            await this.uiActions.element(AddDocumentPage.MINIMIZE_BUTTON, "Minimize Button").click();
        }
    public async selectEntryTemplate(documenName: string) {
           const entryTemplate = this.excel.getEntryTemplateByDocumentType(documenName);
           if (entryTemplate) {
            await this.uiActions.editBox(AddDocumentPage.ENTRY_TEMPLATE_INPUT, "Entry template").fill(entryTemplate);
            await this.uiActions.keyPress("Enter", "Enter Key");
            await this.uiActions.waitForDomContentLoaded();
            await this.uiActions.element(AddDocumentPage.ATTRIBUTES_DIV, "Attributes div").isVisible(5);
           }
        }
    private async fillTextBoxAttribute(attribute: string, value: string) {
            const attributeLocator = await this.attributeUtil.createAttributeInputSelector(attribute as string);
            await this.uiActions.editBox(attributeLocator, attribute).fill(value);
        }
    public async fillMandatoryAttributes(documentType:string) {
        const mandatoryAttributes = this.excel.getMandatoryAttributes(documentType);
        const entryTemplate = this.excel.hasEntryTemplate(documentType);
        
        // Check if documentType has an entry template attribute
        if (entryTemplate) {          
                await this.selectEntryTemplate(entryTemplate);         
        }
        for (const attribute of mandatoryAttributes) {
            if (attribute.attributeName !== "Entry Template") {
                const attributeLocator = await this.attributeUtil.createAttributeInputSelector(attribute.attributeName);
                await this.uiActions.editBox(attributeLocator, attribute.attributeName).fill(attribute.defaultValue);
            }
        }
    }

    // public async openAddDocumentPage(documentType:string) {
    //     const entryTemplate = this.excel.hasEntryTemplate(documentType); 
    //     // Check if documentType has an entry template attribute
    //     if (entryTemplate) {          
    //             await this.selectEntryTemplate(entryTemplate);         
    //     }
    // }

    public async addDocument(documentType: string) {
        await this.setUploadFilePath();
        await this.fillMandatoryAttributes(documentType);
        await this.clickAddButton();
        await this.clickAddButton();
    }
}
