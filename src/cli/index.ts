#!/usr/bin/env node


import Browser from '../browser';
import readline from 'readline';
import { IBrowser } from '../browser';
import { Scrap } from '../amazon';

const browserOptions: IBrowser = {
    defaultViewPort: {
        width: 1920,
        height: 1080,
    },
    url: 'https://www.goodreads.com/choiceawards/best-books-2020',
    headless: false
}



export default class CLI {

    constructor(props: any) {

    }

    public async readLine(genres: string[]) {
        try {
            console.log('Please, choose genre')

            genres.map((item: string, index: number) => {
                console.log(`${index + 1}. ${item}`)
            })
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: true
            });


            rl.on('line', async (genreId: number) => {
                if (genreId > 1 && genreId < genres.length) {
                    const res = await this.openBookPage(genres[genreId - 1]);
                }

            });
        } catch (error: any) {
            throw Error(error)
        }
    }

    public async getBookGenres() {
        try {
            const browser = new Browser(browserOptions);
            const page = await browser.openPage();

            let genres = await browser.getElementsValue(page, 'h4.category__copy');

            return genres.map((item: string) => {
                return item.replace('\n', '').replace('&amp;', '&');
            })
        } catch (error: any) {
            throw Error(error)
        }
    }

    private async openBookPage(bookName: string) {
        const amazonScarper = await Scrap(bookName);
    }
}


interface Book {
    value: string;
}
