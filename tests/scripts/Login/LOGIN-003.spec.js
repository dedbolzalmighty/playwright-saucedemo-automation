/*
Run : npx playwright test LOGIN-003.spec.js --headed --project=chromium
*/

import { test,expect } from '@playwright/test'
import { LoginPage } from '../../../pages/login.page'

test('Login test - Missing', async({page}) => {

    const Login = new LoginPage(page)
    
    //go to login page url
    await Login.gotoLoginPage();

    //input username and password then login
    //await Login.enterUsername('standard_user')
    //await Login.enterPassword('secret_sauce3')
    await Login.clickLogin()

    //assertion
    await Login.errorMessage()

   
})
