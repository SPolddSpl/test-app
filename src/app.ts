import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/s?k=lord+of+ring+book&ref=nb_sb_noss_2');
    const link = await page.$$('.a-link-normal');
    await link[0].click();
    await page.screenshot({ path: 'huh.jpg' });

    await browser.close();
})();