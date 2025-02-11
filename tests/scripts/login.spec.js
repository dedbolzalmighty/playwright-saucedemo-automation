import { test,expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'

test('Login test - valid', async({page}) => {

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

test('Login test - invalid', async({page}) => {

    const Login = new LoginPage(page)
    
    //go to login page url
    await Login.gotoLoginPage();

    //input username and password then login
    await Login.enterUsername('standard_user')
    await Login.enterPassword('secret_sauce3')
    await Login.clickLogin()

    //assertion
    await Login.errorMessage()
})




