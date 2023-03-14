import { Context } from "koa";
import indexService from "../service/user";

class IndexControler {
  async index(ctx: Context, next) {
    ctx.result = {
      a: 1,
    };
    next();
  }
}

export default new IndexControler();
