/*
Run : npx playwright test PROD-004.spec.js --headed --project=chromium
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

    test('Product sort dropdown - Name z to a', async({page}) =>{
    
       // wait for products text to be visible
       await page.waitForSelector('text=Products', { state: 'visible' });
        // click the sort drop down name a to z
       await page.getByRole('combobox').selectOption('za');
       await page.waitForTimeout(5000);

       const productNamesZA = await page.$$eval('.inventory_item_name', items =>
       items.map(item => item.textContent?.trim() || '')
       );
 
       // Create a sorted copy for comparison
       const sortedZA = [...productNamesZA].sort((a, b) => b.localeCompare(a));

       // Assert actual order equals expected sorted order
       expect(productNamesZA).toEqual(sortedZA);

        
    
    })
})

