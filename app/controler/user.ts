import { Context } from "koa";
import userService from "../service/user";
import { RegisterParams } from "../types/index";
import { USER_ACCOUNT_ALREADY_EXIST } from "../http/response-status";

class UserControler {
  async login(ctx: Context) {
    let params = ctx.request.body;
    userService.login();
  }

  async register(ctx: Context, next) {
    let { username, password, mobile } = ctx.request.body as RegisterParams;
    // 判断是否已注册
    let result = (await userService.judgeRegister(mobile)) as [];
    if (result && result.length) {
      await USER_ACCOUNT_ALREADY_EXIST(ctx);
    } else {
      // 插入
      await userService.register({ username, password, mobile });
      ctx.result = null;
      next();
    }
  }
}

export default new UserControler();
