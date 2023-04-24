import fs from "fs";
import http from "http";
import path from "path";
import https from "https";
import cheerio from "cheerio";

https.get("https://www.op.gg/champions", (res) => {
  let html = "";
  res.on("data", (chunk) => {
    html += chunk;
  });

  res.on("end", () => {
    let data: {
      name: string;
      t: string;
      winningPercentage: string;
      banningPercentage: string;
      debutPercentage: string;
      bigImage?: string;
    }[] = [];

    let $ = cheerio.load(html);
    $(".e1oulx2j7 tr").each(function () {
      let name = $(".e1oulx2j6 a strong", this).text();
      let t = $(".e1oulx2j3", this).text();
      t = t.charAt(t.length - 1);
      let wstring = $(".exo2f211", this).text();
      let bigImage = $(".e1oulx2j6 a img", this).attr("src");

      let wArray = wstring.split("%");
      let winningPercentage = wArray[0] + "%";
      let debutPercentage = wArray[1] + "%";
      let banningPercentage = wArray[2] + "%";

      if (name) {
        data.push({
          name,
          t,
          winningPercentage,
          debutPercentage,
          banningPercentage,
          bigImage,
        });
      }
    });

    data = data.sort((a, b) => Number(a.t) - Number(b.t));

    let filename = __filename.slice(__dirname.length + 1).split(".")[0];
    let filePath = path.resolve(__dirname, "./result/" + filename + ".json");
    fs.writeFileSync(filePath, JSON.stringify(data));
  });
});
