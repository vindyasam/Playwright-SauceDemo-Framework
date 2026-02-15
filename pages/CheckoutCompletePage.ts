// pages/CheckoutCompletePage.ts
import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';

export class CheckoutCompletePage {

  private readonly page: Page;
  private readonly eleUtil: ElementUtil;

  private readonly headerText: Locator;
  private readonly messageText: Locator;
  private readonly backHomeButton: Locator;
  private readonly ponyImage: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);

    this.headerText     = page.locator('.complete-header');
    this.messageText    = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
    this.ponyImage      = page.locator('.pony_express');
    this.cartBadge      = page.locator('.shopping_cart_badge');
  }

  async waitForPage(): Promise<void> {
    await this.page.waitForURL('**/checkout-complete.html', { waitUntil: 'networkidle' });
  }

  async getHeaderText(): Promise<string> {
    return await this.headerText.innerText();
  }

  async getMessageText(): Promise<string> {
    return await this.messageText.innerText();
  }

  async isPonyImageVisible(): Promise<boolean> {
    return await this.ponyImage.isVisible();
  }

  async clickBackHome(): Promise<void> {
    await this.eleUtil.click(this.backHomeButton);
  }

  async isCartBadgeVisible(): Promise<boolean> {
    // On empty cart, badge usually disappears
    return await this.cartBadge.isVisible();
  }
}