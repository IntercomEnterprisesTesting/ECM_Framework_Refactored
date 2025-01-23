/* eslint-disable max-len */
export default class AddDocumentPage {
    static readonly UPLOAD_FILE_BUTTON = "//button[@type='button' and @id='ecm_widget_AddContentItemGeneralPane_0_fileSelectButton' and text()='Choose Files']";
    static readonly FILE_INPUT = 'input[type="file"]';
    static readonly ADD_FILE_BUTTON = '//span[@role="button" and contains(@id,"ADD_dijit_form_Button")]';
    static readonly MINIMIZE_BUTTON = 'span[role="button"][title="Restore"]';
    static readonly MANDATORY_FIELD_ERROR_MESSAGE_LOCATOR = "This value is required.";
    static readonly LIST_LOCATOR = '//input[@alt="النوع"]';
    static readonly MANDATORY_FIELD_ERROR_TEXT = `//div[@role="presentation" and text() = ${this.MANDATORY_FIELD_ERROR_MESSAGE_LOCATOR}]`;
    static readonly ENTRY_TEMPLATE_INPUT = '//input[contains(@id,"entryTemplateSelector")]';
    static readonly CANCEL_BUTTON = '//span[@role="button" and contains(@id,"CANCEL_ecm_widget_dialog_AddContentItemDialog")]';
    static readonly ATTRIBUTES_DIV = '//div[@class="documentClassDiv"]';
    static readonly ADD_DOCUMENT_WORD = '//span[@data-dojo-attach-point= "titleNode" and text() = "Add Document"]';
}
