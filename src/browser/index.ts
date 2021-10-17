import puppeteer from 'puppeteer';


export default class Browser {
    private readonly _props: IBrowser;
    constructor(props: IBrowser) {
        this._props = props;
    }

    public async openPage() {
        try {
            const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36';

            const browser = await puppeteer.launch({
                headless: this._props.headless,
                defaultViewport: this._props.defaultViewPort
            });

            const page = await browser.newPage();
            await page.setUserAgent(USER_AGENT);
            await page.goto(this._props.url, {
                waitUntil: 'networkidle2'
            });

            return page;
        } catch (error: any) {
            throw Error('Error in openPage -> ' + error.message)
        }
    }

    public async getElement(page: puppeteer.Page, selector: string) {
        try {
            const elem = await page.waitForSelector(selector);

            return elem;
        } catch (error: any) {
            throw Error('Error -> ' + error.message);
        }
    }

    public async getElementsValue(page: puppeteer.Page, selector: string) {
        try {
            const elems: string[] = await page.$$eval(selector, (item) => {
                return item.map((innerItem) => {
                    return innerItem.innerHTML;
                })
            });
            return elems;
        } catch (error: any) {
            throw Error(error);
        }
    }

}

//input#twotabsearchtextbox




export interface IBrowser {
    headless: boolean;
    url: string;
    defaultViewPort: IViewPort;
}

interface IViewPort {
    width: number;
    height: number;
}