const puppeteer = require("puppeteer-extra");
const fs = require('fs');

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
puppeteer.launch({ headless: false }).then(async (browser) => {
  console.log("started...");
  const searchString = "yekta kopan";
  const url = `https://www.nadirkitap.com/kitapara_sonuc.php?kelime=${searchString}`;
  const page = await browser.newPage();

  const pages = await browser.pages();
  if (pages.length > 1) {
    await pages[0].close();
}
  await page.goto(url, { waitUntil: "networkidle0" });
  //await page.waitFor(1000);
  let itemCount = await page.evaluate(() => {
    let item = document.querySelector(".aramatitlerow>p>b").innerText;
    return item;
  });
  const size = Math.ceil(itemCount / 25);
  console.log(size);
  const page2 = await browser.newPage();
  await page.close();

  const sahafList = [];
  for (let i = 1; i <= size; i++) {
    await page2.goto(`${url}&siralama=fiyatartan&bks=69&page=${i}`, {waitUntil: "networkidle2"
  });
  //await page.waitFor(1000);
    let sahaf = await page2.evaluate(() => {
      let list = [
        "Sahaf Haziran",
        "Fersuden Sahaf",
        "Ex libris",
        "Akel Kitapevi",
        "Ümit Kitabevi",
        "Park Sahaf",
        "Zeugma Kitabevi / Sahaf",
        "Aydan Sahaf",
        "Sahaf Cumhur",
        "Anka Kitabevi / Sahaf",
        "Arda Fırat",
        "Kenar Kitabevi / Sahaf",
        "Parşömen Kitabevi / Sahaf",
        "Cemal Kitabevi",
        "Renkli Kitap",
        "Belki Kitabevi / Sahaf",
        "Nemesis Koleksiyon",
        "Gargantua Sahaf",
        "Beri Kitabevi",
        "Adalet Sahaf",
        "Yabancı Kitabevi",
        "Zümrüt Sahaf",
        "Nirengi Kitabevi",
        "Gökçe Kitap",
        "Kırık Saat Kitap",
        "İzmir Aydın Kitabevi",
        "Fikiradaş",
        "Tercüme Kitabevi / Sahaf",
        "Pagos Sahaf ve Kitabevi",
        "Karya Sahaf",
        "Mama Kitabevi",
        "Soyut Sahaf",
        "Vintagebook",
        "Sun-Nev",
        "Nerduban Sahaf",
        "Yeşilyurt Kitabevi",
        "Hayat Ağacı Sahaf",
        "Dergi Rafı",
        "Yıldız Sahaf",
        "Uykusuz1922",
        "Kedi Kitap",
        "Hacivat Sahaf",
        "Mavi Kitabevi",
        "Yerdeniz Kitapçısı",
        "Velespit Kitap",
        "Kimse Kitabevi&amp;Sahaf",
        "Tutkum Sahaf",
        "Pia Kitabevi",
        "İzmir Akademi Kitabevi",
        "Adres Ksk",
        "Hermes Sahaf",
        "Nergis Sahaf",
        "Baykuş Kitabevi",
        "Alper Kitabevi",
        "Pınar Kitap",
        "Duvar Kitabevi",
        "Serpil Kitabevi",
        "Yeldeğirmeni Kitabevi",
        "Punta Kitabevi",
        "Eylül Sanat Kitabevi",
        "Kitapçı Yavuz",
        "Değirmen Sahaf",
        "Pulp Plak Ve Kitap",
        "Ekmel Sahaf",
        "Book and Bag İsland",
        "Kibele Kitabevi",
        "Neslim Sahaf",
        "Sakin Kitap",
        "Sevgiyolu Kibele Kitabevi",
        "Borges Kitaplığı",
        "Gerçek Sahaf",
        "Ada Yayınları",
        "Arturcogallery Kitap",
        "Roper Kitabevi",
        "Emektar Kitap",
        "Dalga Sahaf",
        "Kül Kitabevi",
        "İzmir Nehir Kitabevi",
        "Gama Kitapevi",
        "Prometekitap",
        "Gırtıllı",
        "İzmir Güler Sahaf",
        "Nihrir Sahaf ",
        "Güzel Sahaf",
        "Yelken Kitabevi ",
        "Smyrna Sahaf",
        "Mad Kitabevi",
        "Demet Kitabevi",
        "Ayraç Sahaf ",
        "Kirpi Sahaf",
        "Tarçın Kitap",
        "Karaburun Kitapçısı ",
        "Mesut Kitabevi",
        "Gece Kitap Cafe",
        "Fil Kitabevi &amp; Sahaf",
        "Kitapçıdede Sahaf",
        "Samimi Kitabevi ",
        "Gaga Kitap Alsancak",
        "Zorba Kitabevi",
        "Doğan Kitabevi",
        "Serendip Sahaf",
        "Zeus Kitabevi",
        "Göktuna Sahaf",
        "Sahaf Defne",
        "Alp Plak &amp; Sahaf",
        "Mesafeler Sahaf",
        "Cafe Marsyas ",
        "İzmir Yol Kitabevi",
        "Bambam Kitap &amp; Cafe",
        "Evvelzaman",
        "Kara Kitap Sahaf ",
        "Tante Rosa Kitabevi",
        "Fayrap Sahaf",
        "Ersöz Sahaf",
        "Sonsuz Sahaf",
        "Gramofon Evi",
        "Sonsuz Çizgi",
        "Bona Fide Sahaf",
        "S.G. Kitabevi",
      ];
      let results = [];
      let items = document.querySelectorAll(".product-list>li");
      items.forEach((item) => {
        let sahaf = item.querySelector(".seller-link").innerText;
        if (list.find((f) => f == sahaf) != undefined) {
          
          results.push({
            book: item.querySelector(".break-work").innerText,
            seller: sahaf,
            price: item.querySelector(".product-list-price").innerText
          });
        }
      });
      return results;
    });
    await sahaf.forEach((s) => {
      sahafList.push(s)
    });
  }
  fs.writeFileSync('./file.json',JSON.stringify(sahafList))

  await browser.close();
});
