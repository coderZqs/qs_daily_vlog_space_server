import { Context } from "koa";
import fs from "fs";
import path from "path";
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
  }
}

export default new IndexControler();
