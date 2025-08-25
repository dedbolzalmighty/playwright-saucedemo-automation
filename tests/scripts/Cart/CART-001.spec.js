import { test, expect } from '@playwright/test'
import { LoginPage} from '../../../pages/login.page'
import { ProductsPage} from '../../../pages/products.page'
import {CartPage} from '../../../pages/cart.page'


test.describe('Product Cart Funtionality', () =>{

    let loginPage
    let productsPage
    let cartPage
    //Define the product name you want to add to the cart
    const productName = 'Sauce Labs Backpack'; // You can replace this with any valid product name on the site

    test.beforeEach(async({page}) =>{
    
            //Pre-conditions: The user is logged in and on the product page
            //Initialize Login page and Products page
            loginPage = new LoginPage(page)
            productsPage = new ProductsPage(page)
    
             //go to login page url
             await loginPage.gotoLoginPage();
        
             //input username and password then login
             await loginPage.enterUsername('standard_user')
             await loginPage.enterPassword('secret_sauce')
             await loginPage.clickLogin()
         
             //Asssertion: Verify if the user is on the product page
             await loginPage.pageLanding()
    
    
        })
        test('Verify if you can navigate to Cart Page',async({page})=>{

          

            //Initialize Cart Page
            cartPage = new CartPage(page)

            //Step 3: Go to Cart Page
            cartPage.cartPageLanding()

            //Step 4: Verify if the cart contains "Your Cart" text
            await expect(page.getByText('Your Cart')).toBeVisible();



        })
        
})


