// pages/CartPage.ts
import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';

export class CartPage {

  private readonly page: Page;
  private readonly eleUtil: ElementUtil;

  // Locators
  private readonly cartItems: Locator;
  private readonly cartItemNames: Locator;
  private readonly cartItemPrices: Locator;
  private readonly cartItemQuantities: Locator;

  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);

    // Cart items
    this.cartItems          = page.locator('.cart_item');
    this.cartItemNames      = this.cartItems.locator('.inventory_item_name');
    this.cartItemPrices     = this.cartItems.locator('.inventory_item_price');
    this.cartItemQuantities = this.cartItems.locator('.cart_quantity');

    // Buttons
    this.checkoutButton         = page.locator('#checkout');            // or getByRole('button', { name: 'Checkout' })
    this.continueShoppingButton = page.locator('#continue-shopping');   // or getByRole('button', { name: 'Continue Shopping' })
  }

  /**
   * Get number of items in cart
   */
  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get all item names in cart
   */
  async getCartItemNames(): Promise<string[]> {
    const count = await this.cartItemNames.count();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      names.push(await this.cartItemNames.nth(i).innerText());
    }
    return names;
  }

  /**
   * Remove an item by its name
   */
  async removeItemByName(itemName: string): Promise<void> {
    const count = await this.cartItems.count();

    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').innerText();
      if (name.trim() === itemName) {
        const removeButton = this.cartItems.nth(i).getByRole('button', { name: 'Remove' });
        await this.eleUtil.click(removeButton);
        break;
      }
    }
  }

  /**
   * Click "Continue Shopping" to go back to products
   */
  async clickContinueShopping(): Promise<void> {
    await this.eleUtil.click(this.continueShoppingButton);
  }

  /**
   * Click "Checkout" to go to checkout-step-one
   */
  async clickCheckout(): Promise<void> {
    await this.eleUtil.click(this.checkoutButton);
  }
}
