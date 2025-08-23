/*
Run : npx playwright test LOGIN-001.spec.js --headed --project=chromium
*/

import { test,expect } from '@playwright/test'
import { LoginPage } from '../../../pages/login.page'

test.only('Login test - valid', async({page}) => {

    //Creating an instange of LoginPage
    const Login = new LoginPage(page)
    
    //go to login page url
    await Login.gotoLoginPage();

    //input username and password then login
    await Login.enterUsername('standard_user')
    await Login.enterPassword('secret_sauce')
    await Login.clickLogin()

    //assertion
    await Login.pageLanding()

    await page.pause()




})





