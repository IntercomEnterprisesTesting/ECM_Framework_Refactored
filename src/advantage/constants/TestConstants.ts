import StringUtil from "@utils/StringUtil";

export default class TestConstants {
    static readonly TEST_FILE_PATH = "src/resources/data/test_file.pdf";
    static readonly PROJECT_FILE = "src/resources/data/Project.xlsx";
    static readonly USERS_FILE = "src/resources/data/users.xlsx";
    static readonly TEST_FILE_NAME = `${StringUtil.randomAlphabeticString(5)}.pdf`;
    static readonly ELEMENT_WAIT_IN_SECONDS = 10;
}
