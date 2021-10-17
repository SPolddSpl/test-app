import puppeteer from 'puppeteer';
import Browser, { IBrowser } from '../browser';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';
const props: IBrowser = {
    defaultViewPort: {
        width: 1920,
        height: 1080
    },
    url: 'http://amazon.com',
    headless: false
}

async function Scrap(bookName: string) {
    try {

        const browser = new Browser(props);
        const page = await browser.openPage();
        const input = await browser.getElement(page, 'input#twotabsearchtextbox');
        await input?.type(bookName, { delay: 100 });

        const sumbitSearchButton = await browser.getElement(page, 'input#nav-search-submit-button');
        await sumbitSearchButton?.click();

        const link = await browser.getElement(page, '.a-link-normal');
        await link?.click();

        const buyBtn = await browser.getElement(page, 'input#buy-now-button');
        await buyBtn?.click();

    } catch (error) {
        throw Error('Error in EXECUTE -> ' + error)
    }


    // await browser.close();
};



export { Scrap };