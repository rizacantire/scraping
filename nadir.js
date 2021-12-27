

const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async (browser) => {
    
  console.log("Running tests..");
  const page = await browser.newPage();
  await page.goto(
    "https://www.nadirkitap.com/kitapara_sonuc.php?kelime=d%FCnya+kupas%FD+tarihi"
  );
  let data = await page.evaluate(() => {
    const sahafList = [
        'Zeugma Kitabevi / Sahaf',
        'Arda Fırat',
        'Ümit Kitabevi',
        'Aydan Sahaf',
        'Sahaf Haziran',
        'Ex libris',
        'Anka Kitabevi / Sahaf',
        'Akel Kitapevi',
        'Fersuden Sahaf',
        'Sahaf Cumhur',
        'Park Sahaf',
        'Kenar Kitabevi / Sahaf',
        'Parşömen Kitabevi / Sahaf',
        'Renkli Kitap',
        'Cemal Kitabevi',
        'Belki Kitabevi / Sahaf',
        'Nemesis Koleksiyon',
        'Karma Kitabevi (miskenacar)',
        'Gargantua Sahaf',
        'Beri Kitabevi'
      ]
    let results = [];
    let items = document.querySelectorAll(".product-list>li");
    items.forEach((item) => {
    let sahaf = item.querySelector(".seller-link").innerText
    if(sahafList.find(f=>f==sahaf)!=undefined){
        results.push({
            seller: item.querySelector(".seller-link").innerText,
            price: item.querySelector(".product-list-price").innerText,
            book: item.querySelector(".break-work").innerText,
          });
    }
   
      
    });
    return results;
  });

  console.log(data);
  await browser.close();
});
;
