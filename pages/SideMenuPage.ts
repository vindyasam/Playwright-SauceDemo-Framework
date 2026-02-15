// pages/SideMenuPage.ts
import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';

export class SideMenuPage {

  private readonly page: Page;
  private readonly eleUtil: ElementUtil;

  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async openMenu(): Promise<void> {
    await this.eleUtil.click(this.menuButton);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    // improved wait: wait until logout link is visible
    await this.page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
    await this.eleUtil.click(this.logoutLink);
    await this.page.waitForURL('https://www.saucedemo.com/');
  }

}
