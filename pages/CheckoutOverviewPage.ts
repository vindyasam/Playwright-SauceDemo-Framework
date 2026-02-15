// pages/CheckoutOverviewPage.ts
import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';

export class CheckoutOverviewPage {

  private readonly page: Page;
  private readonly eleUtil: ElementUtil;
  

  private readonly summaryItems: Locator;
  private readonly paymentInfo: Locator;
  private readonly shippingInfo: Locator;
  private readonly itemTotal: Locator;
  private readonly tax: Locator;
  private readonly total: Locator;

  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);
   
    this.summaryItems = page.locator('.cart_item');
    this.paymentInfo  = page.locator('.summary_info').locator('.summary_value_label').nth(0);
    this.shippingInfo = page.locator('.summary_info').locator('.summary_value_label').nth(1);
    this.itemTotal    = page.locator('.summary_subtotal_label');
    this.tax          = page.locator('.summary_tax_label');
    this.total        = page.locator('.summary_total_label');

    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
  }

  async waitForPage(): Promise<void> {
    await this.page.waitForURL('**/checkout-step-two.html', { waitUntil: 'networkidle' });
  }

  async getSummaryItemsCount(): Promise<number> {
    return await this.summaryItems.count();
  }

  async clickFinish(): Promise<void> {
    await this.eleUtil.click(this.finishButton);
  }

  async clickCancel(): Promise<void> {
    await this.eleUtil.click(this.cancelButton);
  }

  async getItemTotalText(): Promise<string> {
    return await this.itemTotal.innerText();
  }

  async getTaxText(): Promise<string> {
    return await this.tax.innerText();
  }

  async getTotalText(): Promise<string> {
    return await this.total.innerText();
  }
}
