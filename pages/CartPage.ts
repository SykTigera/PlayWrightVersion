import { expect, Locator, Page } from '@playwright/test';

export class Cartpage {

    readonly page: Page;
    readonly CartTable: Locator;
    readonly CartTableActions: Locator;
    readonly CartBillOverview: Locator;
    readonly NoticeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.CartTable = page.locator("xpath=//*[@id='post-6']/div/div/form/table");
        this.CartTableActions = page.locator(".actions");
        this.CartBillOverview = page.locator(".cart-collaterals");
        this.NoticeMessage = page.locator(".woocommerce-notices-wrapper");
    }

    private async getTableRowForProduct(product) {
        return this.CartTable.locator("xpath=//*[text()='" + product + "']/./../..");
    }

    async setQuantityOfProduct(product, quantity) {
        (await this.getTableRowForProduct(product)).locator(".quantity").locator(".input-text").clear();
        (await this.getTableRowForProduct(product)).locator(".quantity").locator(".input-text").fill(quantity);
    }

    async updateCart() {
        this.CartTableActions.locator("css=[name='update_cart']").click();
    }

    async getTotalPrice() {
        return this.CartBillOverview.locator("xpath=//tr[@class='order-total']/td/strong/span");
    }


}