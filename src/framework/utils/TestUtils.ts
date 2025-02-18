export default class TestUtils {
    public static warnings: string[] = [];

    static addBug(warning: string): void {
        this.warnings.push(warning);
    }

    static checkBugs(): void {
        if (this.warnings.length > 0) {
            throw new Error(`Test failed with the following warnings:\n${this.warnings.join('\n')}`);
        }
    }

    static clearBugs(): void {
        this.warnings = [];
    }
}
