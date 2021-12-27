const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://www.nadirkitap.com/sahaflar.php?favori=0&rumuz=&sehir=35')
  let data = await page.evaluate(() => {
    let results = [];
    let items = document.querySelectorAll(".kitapsatici-list>li");
    items.forEach((item) => {
      results.push(
        item.querySelector(".a14brd").innerText
      );
    });
    return results;
  });

  console.log(data);
  await browser.close()
})

