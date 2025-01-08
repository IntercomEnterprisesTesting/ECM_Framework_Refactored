/* eslint-disable max-len */
export default class AddDocumentPage {
    static readonly UPLOAD_FILE_BUTTON = "//button[@type='button' and @id='ecm_widget_AddContentItemGeneralPane_0_fileSelectButton' and text()='Choose Files']";
    static readonly FILE_INPUT = 'input[type="file"]';
    static readonly ADD_FILE_BUTTON = '//span[@class="dijitReset dijitInline dijitButtonText" and text()="Add"]';
    static readonly MINIMIZE_BUTTON = 'span[role="button"][title="Restore"]';
    static readonly MANDATORY_FIELD_ERROR_MESSAGE_LOCATOR = "This value is required.";
    static readonly LIST_LOCATOR = '//input[@alt="النوع"]';
    static readonly MANDATORY_FIELD_ERROR_TEXT = `//div[@role="presentation" and text() = ${this.MANDATORY_FIELD_ERROR_MESSAGE_LOCATOR}]`;
}
