import test, { Page } from "@playwright/test";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
// import CommonConstants from "../constants/CommonConstants";
import LoginPage from "../pages/LoginPage";
// eslint-disable-next-line import/order
import UsersReader from "Excel/usersReader";

export default class LoginPageSteps {
    private uiActions: UIActions;
    private page: Page;
    private usersReader: UsersReader;

    constructor(page: Page, uiActions: UIActions, usersReader: UsersReader) {
        this.page = page;
        this.uiActions = uiActions;
        this.usersReader = usersReader;
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
     * @param user 
     * 0= admin
     * 1= maker
     * 2= checker
     * 3= manager
     * 4= viewer
     */
public async performLogin(user: number) { 
    await test.step("Perform login", async () => {
        const userCredintials = this.usersReader.getUserNameAndPassword(user);
        const userName = userCredintials[0];
        const password = userCredintials[1];
        await this.uiActions.editBox(LoginPage.USER_NAME_TEXTBOX, "userName").fill(userName);
        await this.uiActions.editBox(LoginPage.PASSWORD_TEXTBOX, "password").fill(password);
        await this.uiActions.element(LoginPage.LOGIN_BUTTON, "login button").click();
    });
}
}
