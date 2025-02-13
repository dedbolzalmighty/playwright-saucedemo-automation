import { expect } from '@playwright/test'
import { ProductsPage} from '../pages/products.page'

exports.CartPage = class CartPage
{
    
    constructor(page)
    {
        this.page = page
        this.cartPage = this.page.locator('xpath=//*[@id="header_container"]/div[2]/span')
        this.checkoutButton = this.page.locator('xpath=//*[@id="checkout"]')
        this.checkoutInfoPage = this.page.locator('xpath=//*[@id="header_container"]/div[2]/span')
        this.firstNameField = this.page.locator('xpath=//*[@id="first-name"]')
        this.lastNameField = this.page.locator('xpath=//*[@id="last-name"]')
        this.postalCodeField = this.page.locator('xpath=//*[@id="postal-code"]')
        this.continueButton = this.page.locator('xpath=//*[@id="continue"]')
        this.checkoutOverViewPage = this.page.locator('xpath=//*[@id="header_container"]/div[2]/span')
        this.finishButton = this.page.locator('xpath=//*[@id="finish"]')
       
    }
    async cartPageLanding()
    {
        await this.page.locator('xpath=//*[@id="shopping_cart_container"]/a').click()
        await expect(this.cartPage).toBeVisible
    }

    async cartCheckout()
    {
        await this.checkoutButton.click()
    }
    async cartInfoPage()
    {
        await expect(this.checkoutInfoPage).toBeVisible
    }
    async fillInfoPage(firstName, lastName, postalCode)
    {
        await this.firstNameField.fill(firstName)
        await this.lastNameField.fill(lastName)
        await this.postalCodeField.fill(postalCode)

    }
    async continueCheckout()
    {
        await this.continueButton.click()
    }
    async cartOverViewPage()
    {
        await expect(this.checkoutOverViewPage).toBeVisible()
    }
    async finishCheckout()
    {
        await this.finishButton.click()
    }

    
    
   
   

}