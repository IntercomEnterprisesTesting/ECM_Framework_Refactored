export default class LoginPage {
    static readonly LOGIN_BUTTON = `//span[contains(@id,"LoginButton_label")]`;
    static readonly USER_NAME_TEXTBOX = `//input[contains(@id,"LoginPane_username")]`;
    static readonly PASSWORD_TEXTBOX = `//input[contains(@id,"LoginPane_password")]`; 
    // eslint-disable-next-line max-len
    static readonly CONFIG_ERROR_POPUP = '//div[@class="dijitInline messageDescription" and text()="The application is not configured correctly."]';
    static readonly BODY = '//body[contains(@class, "ecm oneui ecm-en idx_dojo_")]';
    static readonly STYLE = `//div[contains(@class, "ecmSkipNavigation") and @style = "display: inline;"]`;
}
