import { Locator, Page } from "playwright/test";

interface Locators{
    textBox: (textBoxLabel: string) => Locator;
    loginButton: Locator;
    header: Locator;
}

export class LoginPage{
    constructor(readonly page:Page){}

    public locators(): Locators{
        return {
            textBox: (textBoxLabel: string) => {
                return this.page.getByPlaceholder(`${textBoxLabel}`);
            },
            loginButton: this.page.getByRole('button', { name: 'Login' }),
            header: this.page.getByText('Swag Labs')
        }
    }

    public async enterUserName(usrName: string): Promise<void>{
        await this.locators().textBox("Username").fill(usrName);
    }

    public async enterPassword(pwd: string): Promise<void>{
        await this.locators().textBox("Password").fill(pwd);
    }

    public async clickOnLoginButton(): Promise<void>{
        await this.locators().loginButton.click();
    }

    public async navigateToLoginPage(): Promise<void>{
        await this.page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });
    }

    public async loginToApplication(): Promise<void> {
        await this.navigateToLoginPage();
          await this.locators().textBox("UserName").fill("standard_user");
          await this.locators().textBox("Password").fill("secret_sauce");
          await this.clickOnLoginButton();
    }
}