import { expect } from '@playwright/test'

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page
        this.page_title = 'Swag Labs'
    }



    get username_textbox()
    {
        return this.page.locator('xpath=//*[@id="user-name"]')
    }
    get password_textbox()
    {
        return this.page.locator('xpath=//*[@id="password"]')
    }
    get login_button()
    {
        return this.page.locator('xpath=//*[@id="login-button"]')
    }
    get error_message()
    {
        return this.page.locator('xpath=//*[@id="login_button_container"]/div/form/div[3]/h3')
    }
    
    

    async gotoLoginPage()
    {
        await this.page.goto('https://www.saucedemo.com/')
    }


    
    async pageLanding()
    {
        await expect(this.page).toHaveTitle(this.page_title);
    
    }
    async errorMessage()
    {
        await expect(this.error_message).toBeVisible();
    }



    async enterUsername(username)
    {
        await this.username_textbox.fill(username)
    }
    async enterPassword(password)
    {
        await this.password_textbox.fill(password)
    }
    async clickLogin()
    {
        await this.login_button.click();
    }
    

}
