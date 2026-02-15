import { Locator, Page } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';



export class LoginPage{

    //1. page locators/objects/OR:
    private readonly page: Page;
    private readonly eleUtil;
    private readonly username: Locator;
    private readonly pasword: Locator;
    private readonly loginBtn: Locator;
    private readonly warningMsg: Locator;

    //2. page class constructor...
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.pasword = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.locator('.submit-button.btn_action');
        this.warningMsg = page.locator('h3[data-test="error"]');
    }

    //3. page actions/methods:
    /**
     * navigate to the login page
     */
    async goToLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    /**
     * login to app using username/password
     * @param username 
     * @param password 
     * @returns 
     */
    async doLogin(username: string, password: string): Promise<string> {
        await this.eleUtil.fill(this.username, username);
        await this.eleUtil.fill(this.pasword, password);
        await this.eleUtil.click(this.loginBtn);
        const pageTitle = await this.page.title();
        console.log(`Home Page Title: ${pageTitle}`);
        return pageTitle;
    }

    /**
     * get the warning message in case of invalid login
     * @returns 
     */
    async getInvalidLoginMessage(): Promise<string | null> {
        const errorMesg = await this.eleUtil.getText(this.warningMsg);
        console.log('invalid login warning message: ' + errorMesg);
        return errorMesg;
    }


}


/*
LoginPage  →  ProductsPage  →  CartPage  →  
CheckoutInformationPage  →  CheckoutOverviewPage
 →  CheckoutCompletePage  →  ProductsPage  →  SideMenuPage  →  LoginPage
 */