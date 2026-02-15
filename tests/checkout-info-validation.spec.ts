import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';

async function goToCheckoutInformation(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  const productsPage = new ProductsPage(page);
  await page.waitForSelector('.inventory_item');

  await productsPage.addProductToCart('Sauce Labs Backpack');
  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  const cartPage = new CartPage(page);
  await cartPage.clickCheckout();

  const checkoutInfoPage = new CheckoutInformationPage(page);
  await checkoutInfoPage.waitForPage();

  return checkoutInfoPage;
}

test('Checkout info - first name is required', async ({ page }) => {
  const checkoutInfoPage = await goToCheckoutInformation(page);

  // leave first name empty, fill others
  await checkoutInfoPage.fillLastName('TestLast');
  await checkoutInfoPage.fillPostalCode('12345');
  await checkoutInfoPage.clickContinue();

  const errorText = await checkoutInfoPage.getErrorText();
  expect(errorText).toContain('Error: First Name is required');
});

test('Checkout info - last name is required', async ({ page }) => {
  const checkoutInfoPage = await goToCheckoutInformation(page);

  await checkoutInfoPage.fillFirstName('Vindya');
  // last name empty
  await checkoutInfoPage.fillPostalCode('12345');
  await checkoutInfoPage.clickContinue();

  const errorText = await checkoutInfoPage.getErrorText();
  expect(errorText).toContain('Error: Last Name is required');
});

test('Checkout info - postal code is required', async ({ page }) => {
  const checkoutInfoPage = await goToCheckoutInformation(page);

  await checkoutInfoPage.fillFirstName('Vindya');
  await checkoutInfoPage.fillLastName('TestLast');
  // postal code empty
  await checkoutInfoPage.clickContinue();

  const errorText = await checkoutInfoPage.getErrorText();
  expect(errorText).toContain('Error: Postal Code is required');
});

test('Checkout info - cancel goes back to cart page', async ({ page }) => {
  const checkoutInfoPage = await goToCheckoutInformation(page);

  await checkoutInfoPage.clickCancel();

  // back on cart page
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.cart_item')).toBeVisible();
});
