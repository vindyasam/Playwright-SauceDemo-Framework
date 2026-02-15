// tests/checkout-overview-cancel.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

test('User can cancel order from Checkout Overview page and return to products page', async ({ page }) => {

  // ---------------------------
  // LOGIN
  // ---------------------------
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  // ---------------------------
  // ADD 1 PRODUCT
  // ---------------------------
  const productsPage = new ProductsPage(page);
  await productsPage.addProductToCart('Sauce Labs Backpack');

  // ---------------------------
  // NAVIGATE TO CART
  // ---------------------------
  await productsPage.openCart();

  // ASSERTION – NOW ON CART PAGE
  await expect(page).toHaveURL(/cart\.html/);

  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();

  // ---------------------------
  // CHECKOUT STEP ONE
  // ---------------------------
  const infoPage = new CheckoutInformationPage(page);
  await infoPage.waitForPage();

  await infoPage.fillFirstName('John');
  await infoPage.fillLastName('Doe');
  await infoPage.fillPostalCode('12345');
  await infoPage.clickContinue();

  // ---------------------------
  // CHECKOUT OVERVIEW PAGE
  // ---------------------------
  const overviewPage = new CheckoutOverviewPage(page);
  await overviewPage.waitForPage();

  // ---------------------------
  // ACTION – CLICK CANCEL
  // ---------------------------
  await overviewPage.clickCancel();

  // ---------------------------
  // ASSERTION – RETURNED TO PRODUCTS (INVENTORY) PAGE
  // ---------------------------
  await expect(page).toHaveURL(/inventory\.html/);
});
