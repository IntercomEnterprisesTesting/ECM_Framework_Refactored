/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
import AccountServiceSteps from "@soapSteps/AccountServiceSteps";
import { test } from "@base-test";
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";
import Assert from "@asserts/Assert";

const SHEET = "CCH-UploadDocument";
let account: AccountServiceSteps;
test.beforeEach(async ({ page }) => {
    account = new AccountServiceSteps(page);
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const UploadDocument = ExcelUtil.getTestData(SHEET, "TC01_UploadDocument");
test(`${UploadDocument.TestID} - ${UploadDocument.Description}`, async ({ gData }) => {
    Allure.attachDetails(UploadDocument.Description, UploadDocument.Issue);
    const userName = UploadDocument.userName;
    const password = UploadDocument.password;
    const fileName = UploadDocument.fileName;
    const properties = UploadDocument.properties;
    const fileContent = UploadDocument.fileContent;
    const documentClassName = UploadDocument.documentClassName;
    const folderPath = UploadDocument.folderPath;
    const objectStore = UploadDocument.objectStore;

    const requestData = {
        userName: userName,
        password: password,
        fileName: fileName,
        properties: properties,
        fileContent: fileContent,
        documentClassName: documentClassName,
        folderPath: folderPath,
        objectStore: objectStore,
    };
    const response = await account.request(UploadDocument.EndPoint, UploadDocument.RequestBody,
        requestData, UploadDocument.Operation);
    const responseData = await account.getResponseContent(response, UploadDocument.Xpath, UploadDocument.Operation);
    gData.set("userName", userName);
    gData.set("password", password);
    gData.set("fileName", fileName);
    gData.set("properties", properties);
    gData.set("fileContent", fileContent);
    gData.set("documentClassName", documentClassName);
    gData.set("folderPath", folderPath);
    gData.set("objectStore", objectStore);
    Assert.assertStringFormat(responseData, UploadDocument.Result);
});

const UploadDocEmpFile = ExcelUtil.getTestData(SHEET, "TC02_Upload_FileName_Empty");
test(`${UploadDocEmpFile.TestID} - ${UploadDocEmpFile.Description}`, async ({ gData }) => {
    Allure.attachDetails(UploadDocEmpFile.Description, UploadDocEmpFile.Issue);
    const userName = UploadDocEmpFile.userName;
    const password = UploadDocEmpFile.password;
    const fileName = UploadDocEmpFile.fileName;
    const properties = UploadDocEmpFile.properties;
    const fileContent = UploadDocEmpFile.fileContent;
    const documentClassName = UploadDocEmpFile.documentClassName;
    const folderPath = UploadDocEmpFile.folderPath;
    const objectStore = UploadDocEmpFile.objectStore;

    const requestData = {
        userName: userName,
        password: password,
        fileName: fileName,
        properties: properties,
        fileContent: fileContent,
        documentClassName: documentClassName,
        folderPath: folderPath,
        objectStore: objectStore,
    };
    const response = await account.request(UploadDocEmpFile.EndPoint, UploadDocEmpFile.RequestBody,
        requestData, UploadDocEmpFile.Operation);
    await account.verifyResponse(response, UploadDocEmpFile.Xpath, UploadDocEmpFile.Result, UploadDocEmpFile.Operation);
    gData.set("userName", userName);
    gData.set("password", password);
    gData.set("fileName", fileName);
    gData.set("properties", properties);
    gData.set("fileContent", fileContent);
    gData.set("documentClassName", documentClassName);
    gData.set("folderPath", folderPath);
    gData.set("objectStore", objectStore);
});

const uploadDocWrPro = ExcelUtil.getTestData(SHEET, "TC03_Upload_Wrong_Properties");
test(`${uploadDocWrPro.TestID} - ${uploadDocWrPro.Description}`, async ({ gData }) => {
    Allure.attachDetails(uploadDocWrPro.Description, uploadDocWrPro.Issue);
    const userName = uploadDocWrPro.userName;
    const password = uploadDocWrPro.password;
    const fileName = uploadDocWrPro.fileName;
    const properties = uploadDocWrPro.properties;
    const fileContent = uploadDocWrPro.fileContent;
    const documentClassName = uploadDocWrPro.documentClassName;
    const folderPath = uploadDocWrPro.folderPath;
    const objectStore = uploadDocWrPro.objectStore;

    const requestData = {
        userName: userName,
        password: password,
        fileName: fileName,
        properties: properties,
        fileContent: fileContent,
        documentClassName: documentClassName,
        folderPath: folderPath,
        objectStore: objectStore,
    };
    const response = await account.request(uploadDocWrPro.EndPoint, uploadDocWrPro.RequestBody,
        requestData, uploadDocWrPro.Operation);
    await account.verifyResponseContains(response, uploadDocWrPro.Xpath, uploadDocWrPro.Result, uploadDocWrPro.Operation);
    gData.set("userName", userName);
    gData.set("password", password);
    gData.set("fileName", fileName);
    gData.set("properties", properties);
    gData.set("fileContent", fileContent);
    gData.set("documentClassName", documentClassName);
    gData.set("folderPath", folderPath);
    gData.set("objectStore", objectStore);
});

const uploadWrFileCls = ExcelUtil.getTestData(SHEET, "TC04_Upload_Wrong_fileClass");
test(`${uploadWrFileCls.TestID} - ${uploadWrFileCls.Description}`, async ({ gData }) => {
    Allure.attachDetails(uploadWrFileCls.Description, uploadWrFileCls.Issue);
    const userName = uploadWrFileCls.userName;
    const password = uploadWrFileCls.password;
    const fileName = uploadWrFileCls.fileName;
    const properties = uploadWrFileCls.properties;
    const fileContent = uploadWrFileCls.fileContent;
    const documentClassName = uploadWrFileCls.documentClassName;
    const folderPath = uploadWrFileCls.folderPath;
    const objectStore = uploadWrFileCls.objectStore;

    const requestData = {
        userName: userName,
        password: password,
        fileName: fileName,
        properties: properties,
        fileContent: fileContent,
        documentClassName: documentClassName,
        folderPath: folderPath,
        objectStore: objectStore,
    };
    const response = await account.request(uploadWrFileCls.EndPoint, uploadWrFileCls.RequestBody,
        requestData, uploadWrFileCls.Operation);
    await account.verifyResponseContains(response, uploadWrFileCls.Xpath, uploadWrFileCls.Result, uploadWrFileCls.Operation);
    gData.set("userName", userName);
    gData.set("password", password);
    gData.set("fileName", fileName);
    gData.set("properties", properties);
    gData.set("fileContent", fileContent);
    gData.set("documentClassName", documentClassName);
    gData.set("folderPath", folderPath);
    gData.set("objectStore", objectStore);
});
