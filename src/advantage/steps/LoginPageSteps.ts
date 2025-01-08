import test, { Page } from "@playwright/test";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import LoginPage from "../pages/LoginPage";

export default class LoginPageSteps {
    private uiActions: UIActions;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.uiActions = new UIActions(page);
    }

    /**
     * Launch the application
     */
public async launchApplication() {
        await test.step("Launch the application", async () => {
            await this.page.goto(process.env.BASE_URL);
        });
}

/**
     * Log into the application
     * @param userName 
     * @param password 
     */
public async performLogin(userName: string, password: string) { 
    await test.step("Perform login", async () => {
        await this.uiActions.editBox(LoginPage.USER_NAME_TEXTBOX, userName).fill(userName);
        await this.uiActions.editBox(LoginPage.PASSWORD_TEXTBOX, password).fill(password);
        await this.uiActions.element(LoginPage.LOGIN_BUTTON, "login button").click();
    });
}
}
