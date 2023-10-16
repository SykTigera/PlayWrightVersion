import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { Cartpage } from '../pages/cartPage';

test('has title', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new Cartpage(page);

    // 1. Demo Shop unter folgender URL öffnen:
    await page.goto('https://autoprojekt.simplytest.de/');

    // 2. Prüfen, ob die Überschrift sichtbar ist und „Shop“ lautet

    await expect(homePage.MainContentHeader).toHaveText("Shop");
    await expect(homePage.MainContentHeader).toBeVisible();

    // 3. Prüfen, ob Warenkorb leer ist

    await expect(await homePage.getCartItemCount()).toHaveText("0 items");
    await expect(await homePage.getCartAmount()).toHaveText("0,00 €");

    // 4. Artikel „Album“ in Warenkorb durch Klick auf die Taste „Add to cart“ legen
    await homePage.addProductToCartWithButtom("Album");

    // 5. Zum Warenkorb durch den Klick auf die „View cart“ Taste wechseln
    await homePage.viewCartPerButtonPerProduct("Album");

    // 6. Anzahl des Artikels auf 2 erhöhen
    await cartPage.setQuantityOfProduct("Album", "2");

    // 7. Auf „Update cart“ klicken
    await cartPage.updateCart();

    // 8. Den veränderten Gesamtpreis überprüfen ( 30,00 €)
    await expect(await cartPage.getTotalPrice()).toHaveText("30,00 €");


});
