import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllureHelper } from '../utils/AllureHelper';

test('verify valid login', async ({ page }) => {
    AllureHelper.feature('Authentication');
    AllureHelper.story('Valid Login');
    AllureHelper.severity('critical');
    //
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    const actualTitle = await loginPage.doLogin('standard_user', 'secret_sauce');

    await page.waitForURL('**/inventory.html');
    await expect(page.locator('div.app_logo')).toHaveText('Swag Labs123');

});

test('verify Invalid login', async ({ page }) => {
    //
  AllureHelper.feature('Authentication');
  AllureHelper.story('Invalid Login');
  AllureHelper.severity('normal');


    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('standard_user', 'secret_sauce1231');
    
    const errorMesg = await loginPage.getInvalidLoginMessage();
    expect(errorMesg).toContain('Epic sadface: Username and password do not match any user in this service')
 
});


test('shows error when username is empty', async ({ page }) => {
  AllureHelper.feature('Authentication');
  AllureHelper.story('Login Field Validation');
  AllureHelper.severity('minor');

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  // username empty, only password provided
  await loginPage.doLogin('', 'secret_sauce');

  const errorMesg = await loginPage.getInvalidLoginMessage();
  expect(errorMesg).toContain('Epic sadface: Username is required');
});

test('shows error when password is empty', async ({ page }) => {
  AllureHelper.feature('Authentication');
  AllureHelper.story('Login Field Validation');
  AllureHelper.severity('minor');

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  // password empty, only username provided
  await loginPage.doLogin('standard_user', '');

  const errorMesg = await loginPage.getInvalidLoginMessage();
  expect(errorMesg).toContain('Epic sadface: Password is required');
});

test('shows error when both username and password are empty', async ({ page }) => {
  AllureHelper.feature('Authentication');
  AllureHelper.story('Login Field Validation');
  AllureHelper.severity('minor');

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  // both fields empty
  await loginPage.doLogin('', '');

  const errorMesg = await loginPage.getInvalidLoginMessage();
  // App shows username required when both are blank
  expect(errorMesg).toContain('Epic sadface: Username is required');
});

test('shows locked-out error for locked_out_user', async ({ page }) => {
  AllureHelper.feature('Authentication');
  AllureHelper.story('Locked User Login');
  AllureHelper.severity('normal');

  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();

  await loginPage.doLogin('locked_out_user', 'secret_sauce');

  const errorMesg = await loginPage.getInvalidLoginMessage();
  expect(errorMesg).toContain(
    'Epic sadface: Sorry, this user has been locked out.'
  );
});


