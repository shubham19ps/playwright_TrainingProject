import { test, expect } from "../baseconfig/base-config";
// import { LoginPage } from '../pages/sauceDemo-login.page';
// import { HomePage } from '../pages/sauceDemo-home.page';

// let loginPage: LoginPage;
// let homePage: HomePage; 

// test.beforeEach(async ({page}) => {
//   loginPage = new LoginPage(page);
//   homePage = new HomePage(page);
// })

test('SauceLab Login scenario', async ({ page, loginPage,homePage }) => {
  const username = 'standard_user';
  const password = 'secret_sauce';
  //Navigate to website
  await loginPage.navigateToLoginPage();
  //Verify the Login page is loaded.
  await expect(loginPage.locators().header).toBeVisible();  
  await loginPage.locators().textBox("UserName").fill(username);
  await loginPage.locators().textBox("Password").fill(password);
  await loginPage.clickOnLoginButton();
  await expect(homePage.locators().menu).toBeVisible();
  await homePage.locators().menu.click();
  await homePage.locators().menuLogout.click();
});