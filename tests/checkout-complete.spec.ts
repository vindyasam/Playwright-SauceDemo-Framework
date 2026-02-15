// tests/checkout-complete.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { AllureHelper } from '../utils/AllureHelper';

test('User can complete an order and see checkout complete page with cleared cart', async ({ page }) => {
  
  AllureHelper.feature('Checkout');
  AllureHelper.story('Checkout Completion');
  AllureHelper.severity('critical');

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
  // GO TO CART
  // ---------------------------
  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();

  // ---------------------------
  // CHECKOUT STEP ONE
  // ---------------------------
  const infoPage = new CheckoutInformationPage(page);
  await infoPage.waitForPage();

  // You already have these methods
  await infoPage.fillCustomerDetails('John', 'Doe', '12345');
  await infoPage.clickContinue();

  // ---------------------------
  // CHECKOUT OVERVIEW
  // ---------------------------
  const overviewPage = new CheckoutOverviewPage(page);
  await overviewPage.waitForPage();

  // Finish the order
  await overviewPage.clickFinish();

  // ---------------------------
  // CHECKOUT COMPLETE PAGE
  // ---------------------------
  const completePage = new CheckoutCompletePage(page);
  await completePage.waitForPage();

  // URL validation
  await expect(page).toHaveURL(/checkout-complete\.html/);

  // Header & message
  const header = await completePage.getHeaderText();
  expect(header).toContain('Thank you for your order');

  const message = await completePage.getMessageText();
  expect(message).not.toBe(''); // simple non-empty check

  // Pony image visible (optional)
  expect(await completePage.isPonyImageVisible()).toBeTruthy();

  // ---------------------------
  // NAVIGATION: BACK HOME
  // ---------------------------
  await completePage.clickBackHome();
  await expect(page).toHaveURL(/inventory\.html/);

  // ---------------------------
  // CART BADGE CLEARED
  // ---------------------------
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveCount(0);
});
