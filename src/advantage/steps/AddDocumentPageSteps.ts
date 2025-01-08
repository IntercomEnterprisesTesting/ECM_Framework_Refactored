import Assert from "@asserts/Assert";
import HomaPage from "@pages/HomePage";
import AddDocumentPage from "@pages/addDocumentPage";
import { Page } from "@playwright/test";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import LinkUtil from "@utils/LinkUtil";
import AttributeUtil from "@utils/AttributeUtil";

export default class AddDocumentPageSteps {
    private uiActions: UIActions;

    constructor(private page: Page) {
        this.uiActions = new UIActions(page);
    }
    async clickUploadFileButton() {
        await this.uiActions.element(AddDocumentPage.UPLOAD_FILE_BUTTON, "Upload File Button").click();
    }
    async fillTextAttribute(attibuteName : string, value:string) {
        const attributeLocator = AttributeUtil.getAttributeSelector(attibuteName);
        await this.uiActions.editBox(attributeLocator, attibuteName).fill(value);
    }
    async uploadFile(filePath:string) {
        await this.uiActions.element(AddDocumentPage.FILE_INPUT, "file input").setInputFiles(filePath);
        } 
    async confirmAddFile() {
        // eslint-disable-next-line max-len
        await this.uiActions.element(AddDocumentPage.ADD_FILE_BUTTON, "Confirm Add File Button").scrollIntoView();
        await this.uiActions.element(AddDocumentPage.ADD_FILE_BUTTON, "Confirm Add File Button").click();
         } 
}
