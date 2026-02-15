// pages/CheckoutInformationPage.ts
import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';


export class CheckoutInformationPage {


  private readonly page: Page;
  private readonly eleUtil: ElementUtil;

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;

  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;

  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);

    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput  = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');

    this.continueButton = page.locator('#continue');
    this.cancelButton   = page.locator('#cancel');

    this.errorMessage = page.locator('[data-test="error"]');
  }

  async waitForPage(): Promise<void> {
    await this.page.waitForURL('**/checkout-step-one.html', { waitUntil: 'networkidle' });
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInput.fill(postalCode);
  }

  async fillCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.eleUtil.click(this.continueButton);
  }

  async clickCancel(): Promise<void> {
    await this.eleUtil.click(this.cancelButton);
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}
