/* eslint-disable max-len */
export default class CheckInPage {
    static readonly UPLOAD_FILE_BTN = "//button[@type='button' and @id='ecm_widget_AddContentItemGeneralPane_0_fileSelectButton' and text()='Choose Files']";
    static readonly FILE_INPUT = 'input[type="file"]';
    static readonly CHECK_IN_BTN = '//span[@class="dijitReset dijitInline dijitButtonText" and text()="Check In"]';
    static readonly MINIMIZE_BTN = 'span[role="button"][title="Restore"]';
    static readonly MANDATORY_FLD_ERR_TXT = "This value is required.";
    static readonly MANDATORY_FLD_ERR_LOC = `//div[@role="presentation" and text() = ${this.MANDATORY_FLD_ERR_TXT}]`;
    static readonly LIST_LOC = '//input[@alt="النوع"]';
}
