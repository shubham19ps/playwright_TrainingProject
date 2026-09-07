import { Locator, Page } from "playwright/test";

interface Locators{
    title: Locator;
    cartItem: Locator;
    cartItemName: Locator;
    checkoutButton: Locator;
}


export class CartPage{
    constructor (readonly page:Page){}

    public locators(): Locators{
        return{
            title: this.page.locator('[data-test="title"]'),
            cartItem: this.page.locator('[data-test="inventory-item"]'),
            cartItemName: this.page.locator('[data-test="inventory-item-name"]'),
            checkoutButton: this.page.locator('[data-test="checkout"]'),
        }
    }
}