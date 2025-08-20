import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { ProductsPage } from '../../pages/products.page'

test.describe('Product Cart Funtionality', () =>{

    let loginPage
    let productsPage


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

    test.only('Add product on cart', async({page}) =>{

        // Wait for page to load after login
        await page.waitForSelector('.inventory_list'); // Wait until the products are visible
    
        // Step 3: Define the product name you want to add to the cart
        const productName = 'Sauce Labs Backpack'; // You can replace this with any valid product name on the site
      
        // Step 4: Add the product to the cart
        await productsPage.addProductToCart(productName);
        
        // Step 5: Verify that the cart contains the product (expect cart count to be '1')
        const isCartVerified = await productsPage.verifyCartCount(1); // Verify that the cart has 1 item
        expect(isCartVerified).toBe(true); // Assert that the cart verification is true

         await page.pause()

        
        
    
    })
    test('Remove product on cart', async({page}) =>{
    
        // Wait for page to load after login
        await page.waitForSelector('.inventory_list') // Wait until the products are visible
    
        // Step 3: Define the product name you want to add to the cart
        const productName = 'Sauce Labs Backpack' // You can replace this with any valid product name on the site
        // Step 4: Add the product to the cart
        await productsPage.addProductToCart(productName);
        
        // Step 5: Remove the product to the cart
        await productsPage.removeProductToCart(productName)
    
        // Step 6: Verify that the cart is empty (0 items) after removal
        const isCartVerified = await productsPage.verifyCartCount(0); // Verify that the cart has 1 item
        expect(isCartVerified).toBe(true); // Assert that the cart verification is true

     
    
        
       
        
    
    })
})

