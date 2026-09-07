import { Locator, Page } from "playwright/test";

interface Locators{
    title: Locator;
    textBox: (textBoxLabel: string) => Locator;
    continueButton: Locator;
    inventoryItem: Locator;
    finishButton: Locator;
    orderCompleteHeader: Locator;
    orderCompleteText: Locator;
}


export class CheckoutPage{
    constructor (readonly page:Page){}

    public locators(): Locators{
        return{
            title: this.page.locator('[class="title"]'),
            textBox: (textBoxLabel: string) => {
                return this.page.getByPlaceholder(`${textBoxLabel}`);
            },
            continueButton: this. page.getByRole('button', { name: 'Continue' }),
            inventoryItem: this.page.locator('[data-test="inventory-item"]'),
            finishButton: this. page.getByRole('button', { name: 'Finish' }),
            orderCompleteHeader: this.page.locator('[data-test="complete-header"]'),
            orderCompleteText: this.page.locator('[data-test="complete-text"]'),
        }
    }
}