import { expect } from '@playwright/test'
import { ProductsPage} from '../pages/products.page'

exports.CartPage = class CartPage
{
    
    constructor(page)
    {
        this.page = page
        this.cartPage = this.page.locator('xpath=//*[@id="header_container"]/div[2]/span')
        
       
    }
    async cartPageLanding()
    {
        await this.page.locator('xpath=//*[@id="shopping_cart_container"]/a').click()
        await expect(this.cartPage).toBeVisible
    }
    
   
   

}