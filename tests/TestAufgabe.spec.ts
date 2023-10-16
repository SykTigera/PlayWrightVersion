import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

    // 1. Demo Shop unter folgender URL öffnen:
    await page.goto('https://autoprojekt.simplytest.de/');

    // 2. Prüfen, ob die Überschrift sichtbar ist und „Shop“ lautet
    await expect(page.locator("xpath=//*[@id='main']/header")).toHaveText("Shop");
    await expect(page.locator("xpath=//*[@id='main']/header")).toBeVisible();

    // 3. Prüfen, ob Warenkorb leer ist

    await expect(page.locator("xpath=//*[@id='site-header-cart']/li[1]/a/span[2]")).toHaveText("0 items");
    await expect(page.locator("xpath=//*[@id='site-header-cart']/li[1]/a/span[1]")).toHaveText("0,00 €");

    // 4. Artikel „Album“ in Warenkorb durch Klick auf die Taste „Add to cart“ legen
    await page.locator("//a[contains(@aria-label, 'Add “" + "Album" + "” to your cart')]").click();

    // 5. Zum Warenkorb durch den Klick auf die „View cart“ Taste wechseln
    await page.locator("//a[contains(@aria-label, 'Add “" + "Album" + "” to your cart')]/./../a[3]").click();

    // 6. Anzahl des Artikels auf 2 erhöhen
    await page.locator("xpath=//td[@class='product-quantity']/div/input").fill("2");

    // 7. Auf „Update cart“ klicken
    await page.locator("css=[name='update_cart']").click();

    // 8. Den veränderten Gesamtpreis überprüfen ( 30,00 €)
    await expect(page.locator("xpath=//div[@class='cart-collaterals']/div/table/tbody/tr[2]/td/strong/span")).toHaveText("30,00 €");



});
