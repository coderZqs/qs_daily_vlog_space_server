import { Context } from "koa";
import fs from "fs";
import path from "path";
import { SUCCESS } from "../http/response-status";
import axios from "axios";

class IndexControler {
  async upload(ctx: Context, next) {
    let file = (ctx.request.files as any).file;
    const reader = fs.createReadStream(file.filepath);
    const ext = file.originalFilename.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const stream = fs.createWriteStream(
      path.resolve(__dirname, `../public/uploads/${fileName}`)
    );
    reader.pipe(stream);
    await new Promise((resolve) => {
      reader.on("end", () => {
        resolve(
          SUCCESS(ctx, {
            image: "/" + fileName,
          })
        );
      });
    });
  }

  async getOneWord(ctx) {
    let { data } = await axios.get("https://international.v1.hitokoto.cn?c=g");
    SUCCESS(ctx, data);
  }
}

export default new IndexControler();
