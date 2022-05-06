import { PuppeteerNode } from 'puppeteer';
import { delay } from '../../utils/delay';

const puppeteer: PuppeteerNode = require('puppeteer');

export async function getLawsuits(id: number) {
  // https://esaj.tjms.jus.br/cpopg5/show.do?processo.codigo=0100299G00000&processo.foro=1&processo.numero=0814194-90.2022.8.12.0001&uuidCaptcha=sajcaptcha_e139aec9f75649cb8de9702d117afd17
  try {
    const url: string = 'https://esaj.tjms.jus.br/cpopg5/open.do';
    // const lawsuitNumber: string = '0814194-90.2022.8.12.0001';
    const lawsuitNumber: string = '08141949020220001';
    const browser = await puppeteer.launch({
      // headless: false,
      defaultViewport: { width: 1200, height: 800 },
    });
    const page = await browser.newPage();
    const fileName = `name-${Date.now()}`;

    await page.goto(url);
    await delay(300);

    await page.click('input[id="numeroDigitoAnoUnificado"]');
    await delay(240);
    await page.keyboard.type(`${lawsuitNumber}`);

    await delay(374);
    await page.click('input[id="botaoConsultarProcessos"]');

    // Mudar para verificar algo da próxima página
    await delay(1200);

    await page.screenshot({ path: `./tmp/${fileName}.png` });

    console.log(`Finished task: ${id}`);
    // await browser.close();
    return { success: true, index: id, timestamp: Date.now() };
  } catch (error) {
    console.error(error);
    console.log(`Failed on ${id}`);
    return { sucess: false, index: id, timestamp: Date.now() };
  }
}
