import cheerio from "cheerio";
import https from "https";
import fs from "fs";
import path from "path";

https.get("https://wannianrili.bmcx.com", (res) => {
  let html = "";
  res.on("data", (chunk) => {
    html += chunk;
  });

  res.on("end", () => {
    let dates = <{ day: any; festival: any; solar: any }[]>[];
    let $ = cheerio.load(html);

    $(".wnrl_riqi").each(function () {
      dates.push({
        day: $(".wnrl_td_gl", this).text(),
        festival: $(".wnrl_td_bzl_hong", this).text(),
        solar: $(".wnrl_td_bzl_lv", this).text(),
      });
    });

    let filename = __filename.slice(__dirname.length + 1).split(".")[0];
    let filePath = path.resolve(__dirname, "./result/" + filename + ".json");

    fs.writeFileSync(filePath, JSON.stringify(dates));
  });
});
