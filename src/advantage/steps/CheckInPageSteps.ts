/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import CheckInPage from "@pages/CheckInPage";
import PropertiesPage from "@pages/PropertiesPage";
// eslint-disable-next-line import/extensions
import UIActions from "@uiActions/UIActions";
import TestConstants from "@uiConstants/TestConstants";
// import CommonConstants from "../constants/CommonConstants";
import AttributeUtil from "@utils/AttributeUtil";
import DataBuilder from "Excel/DataBuilder";
import { DocumentClass } from "Excel/types";

export default class CheckInPageSteps {
    private uiActions: UIActions;
    private attributeUtil: AttributeUtil;
    private excel: DataBuilder;
    constructor(uiActions: UIActions, attributeUtil: AttributeUtil) {
        this.uiActions = uiActions;
        this.attributeUtil = attributeUtil;
        this.excel = new DataBuilder();
    }

    public async clickUploadFileButton() {
        await this.uiActions.element(CheckInPage.UPLOAD_FILE_BTN, "Upload file button").isVisible();
        await this.uiActions.element(CheckInPage.UPLOAD_FILE_BTN, "Upload file button").click();
    }

    public async checkInfile() {
        await this.uiActions.element(CheckInPage.FILE_INPUT, "File input").setInputFiles(TestConstants.TEST_FILE_PATH);
        await this.uiActions.element(CheckInPage.CHECK_IN_BTN, "Check in button").click();
        } 
}
