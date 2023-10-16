import { expect, Locator, Page } from '@playwright/test';

export class HomePage {

    readonly page: Page;
    readonly MainContentHeader: Locator;
    readonly UpperSorting: Locator;
    readonly ProductTable: Locator;
    readonly LowerSorting: Locator;
    readonly Cart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.MainContentHeader = page.locator("xpath=//*[@id='main']/header");
        this.UpperSorting = page.locator("xpath=//*[@id='main']/div[1]");
        this.ProductTable = page.locator("xpath=//*[@id='main']/ul");
        this.LowerSorting = page.locator("xpath=//*[@id=\'main\']/div[2]");
        this.Cart = page.locator(".site-header-cart");
    }

    async addProductToCartWithButtom(productName) {
        await this.page.locator("xpath=//a[contains(@aria-label, 'Add “" + productName + "” to your cart')]").click();
    }

    async viewCartPerButtonPerProduct(productName) {
        await this.page.locator("xpath=//a[contains(@aria-label, 'Add “" + productName + "” to your cart')]/./../a[3]").click();
    }

    async getCartAmount() {
        return this.Cart.locator(".woocommerce-Price-amount");
    }

    async getCartItemCount() {
        return this.Cart.locator(".count");
    }


}