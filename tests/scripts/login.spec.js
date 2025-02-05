import { test,expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'

test('Valid login test', async({page}) => {

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
})

test('Invalid login test', async({page}) => {

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




