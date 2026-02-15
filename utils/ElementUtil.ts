import { Page, Locator } from '@playwright/test';

export class ElementUtil {

    private page: Page;
    private defaultTimeOut: number = 30000;

    constructor(page: Page, timeOut: number = 30000) {
        this.page = page;
        this.defaultTimeOut = timeOut;
    }

    async click(locator: Locator): Promise<void> {
        await locator.click({ timeout: this.defaultTimeOut });
        console.log(`Clicked element`);
    }

    async fill(locator: Locator, text: string): Promise<void> {
        await locator.fill(text, { timeout: this.defaultTimeOut });
        console.log(`Filled: ${text}`);
    }

    async getText(locator: Locator): Promise<string | null> {
        return await locator.textContent({ timeout: this.defaultTimeOut });
    }
}
