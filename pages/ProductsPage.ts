// pages/ProductsPage.ts
import { Page, Locator } from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';

export class ProductsPage {

  private readonly page: Page;
  private readonly eleUtil: ElementUtil;

  // common locators
  private readonly inventoryItems: Locator;
  private readonly cartIcon: Locator;
  private readonly cartBadge: Locator;
  private readonly productNames: Locator;
  private readonly productPrices: Locator;
  private readonly sortDropdown: Locator;
   
 

  constructor(page: Page) {
    this.page = page;
    this.eleUtil = new ElementUtil(page);

    // All product cardsxa
    this.inventoryItems = page.locator('.inventory_item');

    // Cart icon top-right
    this.cartIcon = page.locator('.shopping_cart_link');

    // Cart badge (count bubble, optional)
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('.product_sort_container');


  }

  /**
   * Add a product to cart by its name text
   * Example: "Sauce Labs Backpack"
   */
  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    const addToCartButton = productCard.getByRole('button', { name: 'Add to cart' });

    await this.eleUtil.click(addToCartButton);
  }

  /**
   * Open the cart page by clicking the cart icon
   */
  async openCart(): Promise<void> {
    await this.eleUtil.click(this.cartIcon);
  }

  /**
   * Get current cart count as number
   */
  async getCartItemCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;

    const text = await this.cartBadge.textContent();
    return text ? parseInt(text) : 0;
  }
    /**
   * Get the Add/Remove button for a given product
   */
  getProductButton(productName: string): Locator {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    return productCard.getByRole('button');
  }

  async validateProductNames(): Promise<void> {
  const count = await this.productNames.count();

  for (let i = 0; i < count; i++) {
    const nameLocator = this.productNames.nth(i);

    await nameLocator.waitFor({ state: 'visible' });

    const nameText = (await nameLocator.textContent())?.trim();

    if (!nameText || nameText.length === 0) {
      throw new Error(`Product name at index ${i} is empty`);
    }
  }
}

async validateProductPrices(): Promise<void> {
  const count = await this.productPrices.count();

  for (let i = 0; i < count; i++) {
    const priceLocator = this.productPrices.nth(i);

    await priceLocator.waitFor({ state: 'visible' });

    const priceText = (await priceLocator.textContent())?.trim();

    // Not empty
    if (!priceText) {
      throw new Error(`Price at index ${i} is empty`);
    }

    //  Format validation ($XX.XX)
    const priceRegex = /^\$\d+\.\d{2}$/;
    if (!priceRegex.test(priceText)) {
      throw new Error(`Price format invalid at index ${i}: ${priceText}`);
    }

    // Numeric conversion validation
    const numericValue = parseFloat(priceText.replace('$', ''));

    if (isNaN(numericValue)) {
      throw new Error(`Price is not a valid number at index ${i}: ${priceText}`);
    }

    //  Business rule: must be positive
    if (numericValue <= 0) {
      throw new Error(`Price must be greater than 0 at index ${i}: ${priceText}`);
    }
  }
}

async validatePriceLowToHighSorting(): Promise<void> {

  // Select "Price (low to high)"
  await this.sortDropdown.selectOption('lohi');

  // Capture prices after sorting
  const count = await this.productPrices.count();
  const uiPrices: number[] = [];

  for (let i = 0; i < count; i++) {
    const priceText = (await this.productPrices.nth(i).textContent())?.trim();
    const numericValue = parseFloat(priceText!.replace('$', ''));
    uiPrices.push(numericValue);
  }

  // Create a sorted copy
  const sortedPrices = [...uiPrices].sort((a, b) => a - b);

  // Compare arrays
  for (let i = 0; i < uiPrices.length; i++) {
    if (uiPrices[i] !== sortedPrices[i]) {
      throw new Error('Prices are not sorted low to high correctly');
    }
  }
}


}
