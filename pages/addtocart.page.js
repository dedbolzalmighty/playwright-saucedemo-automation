import { expect } from '@playwright/test'

class AddToCart
{
    constructor(page)
    {
        this.page = page
    }
    get add_to_cart()
    {
        return this.page.locator('')
    }
}