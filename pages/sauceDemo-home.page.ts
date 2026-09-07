import { Locator, Page } from "playwright/test";

interface Locators{
    menu: Locator;
    menuLogout: Locator;
    addToCartBagpack: Locator;
    addtoCartBikeLight: Locator;
    cartBadge: Locator;
    cartLink: Locator;
}


export class HomePage{
    constructor (readonly page:Page){}

    public locators(): Locators{
        return{
            menu: this.page.getByRole('button', { name: 'Open Menu' }),
            menuLogout: this.page.locator('[data-test="logout-sidebar-link"]'),
            addToCartBagpack: this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
            addtoCartBikeLight: this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'),
            cartBadge: this.page.locator('[data-test="shopping-cart-badge"]'),
            cartLink: this.page.locator('[data-test="shopping-cart-link"]'),
        }
    }
}