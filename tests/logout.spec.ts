// tests/logout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { SideMenuPage } from '../pages/SideMenuPage';
import { AllureHelper } from '../utils/AllureHelper';

test('User can logout using side menu', async ({ page }) => {
  AllureHelper.feature('Authentication');
  AllureHelper.story('Logout');
  AllureHelper.severity('normal');

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.doLogin('standard_user', 'secret_sauce');

  // wait for products page
  const productsPage = new ProductsPage(page);
  

  const sideMenuPage = new SideMenuPage(page);
  await sideMenuPage.logout();

  // ASSERT: back on login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

});
