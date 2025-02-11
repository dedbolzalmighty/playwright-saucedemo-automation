import { test, expect } from '@playwright/test'
import { LoginPage} from '../../pages/login.page'
import { ProductsPage} from '../../pages/products.page'
import {CartPage} from '../../pages/cart.page'

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
         
             //assertion
             await loginPage.pageLanding()
    
    
        })
        test('Verify the cart items matches the added product',async({page})=>{
      
            // Step 1: Add the product to the cart
            const productDetails = await productsPage.addProductToCart(productName);

            // Ensure productDetails was returned (this will throw an error if undefined)
            expect(productDetails).toBeDefined(); 
        
            
            // Step 2: Verify that the cart contains the product (expect cart count to be '1')
            const isCartVerified = await productsPage.verifyCartCount(1); // Verify that the cart has 1 item
            expect(isCartVerified).toBe(true); // Assert that the cart verification is true

            //Initialize Cart Page
            cartPage = new CartPage(page)

            //Step 3: Go to Cart Page
            cartPage.cartPageLanding()

            //Step 4: Verify if the cart contains the exact details as the added product
            const isMatch = await productsPage.verifyProductInCart(productDetails.name, productDetails.price); // Verify cart details

            if (isMatch) {
                console.log('Product details match between the product page and cart page');
            } else {
                console.log('Product details do not match between the product page and cart page');
            }

        })

})