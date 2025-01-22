export default class TestUtils {
    public static warnings: string[] = [];

    static addWarning(warning: string): void {
        this.warnings.push(warning);
    }

    static checkWarnings(): void {
        if (this.warnings.length > 0) {
            throw new Error(`Test failed with the following warnings:\n${this.warnings.join('\n')}`);
        }
    }

    static clearWarnings(): void {
        this.warnings = [];
    }
}
