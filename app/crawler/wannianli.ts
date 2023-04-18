import cheerio from "cheerio";
import https from "https";
import fs from "fs";
import path from "path";

type SubDate = { day: any; festival: any; solar: any }[];

type Date = {
  year: number;
  month: number;
  children: SubDate;
};

type Year = { year: number; month: number };

const generateYears = () => {
  let years: Year[] = [];
  for (let i = 1970; i < 2060; i++) {
    for (let j = 1; j <= 12; j++) {
      years.push({ year: i, month: j });
    }
  }

  return years;
};

let crawler = (item): Promise<Year> => {
  return new Promise(() => {
    https.get(
      `https://wannianrili.bmcx.com/ajax/?q=${item.year}-${
        item.month < 10 ? item.month : "0" + item.month
      }&v=22121301`,
      (res) => {
        let html = "";
        res.on("data", (chunk) => {
          html += chunk;
        });

        res.on("end", () => {
          console.log(
            `https://wannianrili.bmcx.com/ajax/?q=${item.year}-${item.month}&v=22121301`
          );

          let dates = <SubDate>[];
          let $ = cheerio.load(html);

          $(".wnrl_riqi").each(function () {
            dates.push({
              day: $(".wnrl_td_gl", this).text(),
              festival: $(".wnrl_td_bzl_hong", this).text(),
              solar: $(".wnrl_td_bzl_lv", this).text(),
            });
          });

          datess.push({
            year: item.year,
            month: item.month,
            children: dates,
          });
        });
      }
    );
  });
};

let years = generateYears();
let datess: Date[] = [];
let promises: Promise<Year>[] = [];

years.forEach((item) => {
  promises.push(crawler(item));
});

Promise.all(promises).then(() => {
  let filename = __filename.slice(__dirname.length + 1).split(".")[0];
  let filePath = path.resolve(__dirname, "./result/" + filename + ".json");

  fs.writeFileSync(filePath, JSON.stringify(datess));
});
