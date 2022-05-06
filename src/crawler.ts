import { PuppeteerNode } from 'puppeteer';
// import { delay } from './utils/delay';

const puppeteer: PuppeteerNode = require('puppeteer');

export async function takeScreenshot(fileKey: string, url: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1200, height: 800 },
    });
    const page = await browser.newPage();
    const fileName = `name-${Date.now()}`;

    await page.goto(url);

    // Try to find a better way to check this.
    // Method Page.pdf() doesn't work on headless browser
    // if (browser._process.spawnargs.includes('--headless')) {
    //   console.log('Print PDF!');
    //   await page.pdf({ path: `./tmp/${fileName}.pdf` });
    // }

    await page.screenshot({ path: `./tmp/${fileName}.png` });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}
