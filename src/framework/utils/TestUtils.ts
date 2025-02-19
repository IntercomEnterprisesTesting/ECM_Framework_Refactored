export default class TestUtils {
    public static warnings: string[] = [];

    static addBug(warning: string): void {
        this.warnings.push(warning);
    }

    static async checkBugs(): Promise<void> {
        if (this.warnings.length > 0) {
            throw new Error(`TEST FAILED - Found ${this.warnings.length} issues:\n${this.warnings.join('\n')}`);
        } else {
            console.log("Test Passed"); // Log success message if no errors
        }
    }

    static clearBugs(): void {
        this.warnings = [];
    }
}
