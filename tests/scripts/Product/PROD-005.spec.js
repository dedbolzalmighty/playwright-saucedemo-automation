/*
Run : npx playwright test PROD-005.spec.js --headed --project=chromium
*/

import { test, expect } from '@playwright/test'
import { LoginPage } from '../../../pages/login.page'
import { ProductsPage } from '../../../pages/products.page'

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

    test('Product sort dropdown - Price low to high', async({page}) =>{
    
       // wait for products text to be visible
       await page.waitForSelector('text=Products', { state: 'visible' });
        // click the sort drop down price low to high
       await page.getByRole('combobox').selectOption('lohi');
       await page.waitForTimeout(5000);

       // grab all product prices
       const productPrices = await page.$$eval('.inventory_item_price', items =>
       items.map(item => parseFloat(item.textContent?.replace('$', '') || '0'))
       );
 
       // Create a sorted copy for comparison
       const sortedPrices = [...productPrices].sort((a, b) => a - b);

       // Assert that displayed prices match the sorted list
       expect(productPrices).toEqual(sortedPrices);

        
    
    })
})

