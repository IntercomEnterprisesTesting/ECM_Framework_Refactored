/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/dot-notation */
import TestConstants from "@uiConstants/TestConstants";
import XLSX from "xlsx";
import path from 'path';

export default class UsersReader {
    private workbook: XLSX.WorkBook;
    private usersSheet: XLSX.WorkSheet;
    private usersData: any[];

    constructor() {
        let filePath: string;
        try {
            filePath = path.resolve(TestConstants.USERS_FILE);
            this.workbook = XLSX.readFile(filePath);
        } catch (error) {
            throw new Error(`Error resolving file path: ${error.message}`);
        }
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.usersSheet = this.workbook.Sheets['Sheet1'];
        this.usersData = XLSX.utils.sheet_to_json<any>(this.usersSheet);
    }

    public getUserNameAndPassword(user: number): [string, string] {
        if (user < 0 || user >= this.usersData.length) {
            throw new Error(`User at index ${user} not found.`);
        }
        const userData = this.usersData[user];
        const userName = userData['username'];
        const password = userData['password'];
        return [userName, password];
    }
}
