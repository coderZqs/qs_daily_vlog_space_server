import { Context } from "koa";
class IndexControler {
  async index(ctx: Context, next) {
    ctx.result = {
      a: 1,
    };
    next();
  }
}

export default new IndexControler();
