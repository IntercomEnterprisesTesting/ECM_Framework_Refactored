/* eslint-disable max-len */
export default class PropertiesPage {
    static readonly MINIMIZE_BUTTON = 'span[role="button"][title="Restore"]';
    static readonly MANDATORY_FIELD_ERROR_MSG = '//div[@role="presentation" and text() = "This value is required."]';
    static readonly DOCUMENT_STATUS = "حاله المستند";
    static readonly SAVE_BUTTON = '//span[@class="dijitReset dijitInline dijitButtonText" and text()="Save"]';
    static readonly DOCUMENT_VERSION = `//input[@type="hidden" and @value = "2.0"]`;
    static readonly CANCEL_BUTTON = `//span[@id = "CANCEL_ecm_widget_dialog_EditPropertiesDialog_1_label" and text()="Cancel"]`;
}
