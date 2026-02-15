// tests/checkout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { AllureHelper } from '../utils/AllureHelper';

test.describe('Checkout flow', () => {

  test('User can complete checkout successfully', async ({ page }) => {

    // 1) Login
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('standard_user', 'secret_sauce');

    // 2) Products page
    const productsPage = new ProductsPage(page);
    await page.waitForSelector('.inventory_item'); // improved wait
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    // 3) Cart page
    const cartPage = new CartPage(page);
    const cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe(1);

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain('Sauce Labs Backpack');

    await cartPage.clickCheckout();

    // 4) Checkout information page
    const checkoutInfoPage = new CheckoutInformationPage(page);
    await checkoutInfoPage.waitForPage();   // <-- Missing in your version
    await checkoutInfoPage.fillCustomerDetails('Vindya', 'Test', '12345');
    await checkoutInfoPage.clickContinue();

    // 5) Checkout overview page
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await checkoutOverviewPage.waitForPage();  // <-- Required

    // VALIDATIONSbefore clicking Finish)
    const itemsCount = await checkoutOverviewPage.getSummaryItemsCount();
    expect(itemsCount).toBe(1);

    const itemTotal = await checkoutOverviewPage.getItemTotalText();
    expect(itemTotal.toLowerCase()).toContain('item total');

    const taxText = await checkoutOverviewPage.getTaxText();
    expect(taxText.toLowerCase()).toContain('tax');

    const totalText = await checkoutOverviewPage.getTotalText();
    expect(totalText.toLowerCase()).toContain('total');

    // NOW click finish
    await checkoutOverviewPage.clickFinish();

    // 6) Checkout complete page
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await checkoutCompletePage.waitForPage();

    const headerText = await checkoutCompletePage.getHeaderText();
    expect(headerText.toLowerCase()).toContain('thank you for your order!');

    const messageText = await checkoutCompletePage.getMessageText();
    expect(messageText.toLowerCase()).toContain('your order has been dispatched');

    // Back Home navigation
    await checkoutCompletePage.clickBackHome();

    // ASSERT: user is back on products page
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item').first()).toBeVisible();


  });

});
