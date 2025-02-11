import { expect } from '@playwright/test'

exports.ProductsPage = class ProductsPage
{
    constructor(page)
    {
        this.page = page
        this.productsList = '.inventory_item'; // Each product is wrapped in this class
        this.productNameSelector = '.inventory_item_name'; // Product name selector
        this.productPriceSelector = '.inventory_item_price'; // Product price selector
        this.addToCartButton = '.btn_inventory'; // Add to cart button selector
        this.removeToCartButton = '.btn_inventory'; // Remove to cart button selector
        this.cartBadge = '.shopping_cart_badge'; // Cart badge selector
    }
 
    // This method removes products into the cart
    async productInCart(productName, action)
    {
        console.log(`Searching for product: ${productName}`);

        // Wait for the products list to appear
        await this.page.waitForSelector(this.productsList);
        // Get all product elements
        const products = await this.page.locator(this.productsList);
        // Loop through the products to find the product with the matching name
        const productCount = await products.count();

        let productDetails = null; // To store the product name and price

        for (let i = 0; i < productCount; i++) 
       {
           const product = products.nth(i);
           const productText = await product.locator(this.productNameSelector).textContent();
           const productPrice = await product.locator(this.productPriceSelector).textContent();

           console.log(`Checking product: ${productText.trim()} with price: ${productPrice.trim()}`);

           // If the product matches the name input, click the "Remove" button
           if (productText.trim() === productName) {
            
            const buttonSelector = action === 'add' ? this.addToCartButton : this.removeToCartButton;
            await product.locator(buttonSelector).click(); // Click the appropriate button
            
                // Capture the name and price of the product
                productDetails = 
                {
                    name: productText.trim(),
                    price: productPrice.trim()
                };

                console.log(`Product added: ${productDetails.name}, Price: ${productDetails.price}`);
                break; // Exit the loop once the product is found and action is completed
               
           }
       }
       
       if(!productDetails) 
       {
            console.log(`Product "${productName}" not found in the list.`);
       }


       return productDetails; // Return the product details

    }




    // This method adds products into the cart
    async addProductToCart(productName) 
    {
        return await this.productInCart(productName, 'add');
    }
    // This method removes products from the cart
    async removeProductToCart(productName) 
    {
        return await this.productInCart(productName, 'remove');
    }







    // This method verifies the number of items in the cart
    async verifyCartCount(expectedCount) 
    {
        try
        {
            // Wait for the cart badge to be visible
            await this.page.waitForSelector(this.cartBadge, { timeout: 5000 });
            
            // Get the actual number of items in the cart
            const cartItemCount = await this.page.textContent(this.cartBadge);
            
            // Compare the actual cart count with the expected count
            return cartItemCount.trim() === expectedCount.toString();
        }
        catch (error)
        {
            // If the cart badge is not found, return true if expected count is 0
            if (expectedCount === 0) return true;  // No cart badge means empty cart
            throw new Error('Cart badge not found when it was expected');
        }
    }

    //Verify product in cart if match
    async verifyProductInCart(productName, productPrice)
    {
        // Wait for cart items to load
        await this.page.waitForSelector('.cart_item');

        // Get the product name and price in the cart
        const cartItems = await this.page.locator('.cart_item');
        const cartItemCount = await cartItems.count();

        let isMatch = false;

        for (let i = 0; i < cartItemCount; i++)
        {
            const cartItem = cartItems.nth(i);
            const cartProductName = await cartItem.locator('.inventory_item_name').textContent();
            const cartProductPrice = await cartItem.locator('.inventory_item_price').textContent();
    
            // Compare name and price in the cart with the selected product
            if(cartProductName.trim() === productName && cartProductPrice.trim() === productPrice) 
            {
                isMatch = true;
                break;
            }
        }
        return isMatch;

    }

}