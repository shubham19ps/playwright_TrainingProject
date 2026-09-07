import {test as baseTest  } from "@playwright/test";
import { HomePage } from "../pages/sauceDemo-home.page";
import { LoginPage } from "../pages/sauceDemo-login.page";
import { CartPage } from "../pages/sauceDemo-cart.page";
import { CheckoutPage } from "../pages/sauceDemo-checkout.page";

type myTestFixture = {
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage
    checkoutPage: CheckoutPage
    loginToSauceDemoApp: void;
};

export const test = baseTest.extend<myTestFixture>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },
    homePage: async({page}, use)=>{
        await use(new HomePage(page));
    },
    cartPage: async({page}, use)=>{
        await use(new CartPage(page));
    },
    checkoutPage: async({page}, use)=>{
        await use(new CheckoutPage(page));
    },
    loginToSauceDemoApp: async({loginPage}) => {
        await loginPage.loginToApplication();
    },
});

export { expect } from "@playwright/test";