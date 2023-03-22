import { Context } from "koa";
import userService from "../service/user";
import { UserParams } from "../types/index";
import {
  USER_ACCOUNT_ALREADY_EXIST,
  SUCCESS,
  USER_ACCOUNT_NOT_EXIST,
  USER_PWD_ERROR,
} from "../http/response-status";
import { encrypt, decrypt } from "../utils/crypto";
import JwtAuth from "../utils/jwt";

class UserControler {
  async login(ctx: Context) {
    let { mobile, password } = ctx.request.body as UserParams;
    let data = (await userService.judgeExistUserByMobile(mobile)) as {
      username: string;
      password: string;
      id: number;
    }[];

    if (data && data.length) {
      // 判断密码
      let deCryptPassword = decrypt(data[0].password);
      if (deCryptPassword === password) {
        let tokenData = {
          time: Date.now(),
          timeout: Date.now() + 60000,
          username: data[0].username,
          id: data[0].id,
        };
        const token = JwtAuth.signUserToken(tokenData);

        SUCCESS(ctx, token);
      } else {
        USER_PWD_ERROR(ctx);
      }
    } else {
      USER_ACCOUNT_NOT_EXIST(ctx);
    }

    // 判断账号密码是否一致。
  }

  async register(ctx: Context) {
    let { username, password, mobile } = ctx.request.body as UserParams;
    // 判断是否已注册
    let result = (await userService.judgeRegister(mobile)) as [];
    if (result && result.length) {
      await USER_ACCOUNT_ALREADY_EXIST(ctx);
    } else {
      // 加密
      let enCryptPassword = encrypt(password);
      let id = (await userService.register({
        username,
        password: enCryptPassword,
        mobile,
      })) as number;

      let tokenData = {
        time: Date.now(),
        timeout: Date.now() + 60000,
        username: username,
        id: id,
      };
      const token = JwtAuth.signUserToken(tokenData);
      SUCCESS(ctx, token);
    }
  }

  async getInfo(ctx) {
    let data = (await userService.findUser({
      id: ctx.state.user_id,
    })) as object[];

    SUCCESS(ctx, data[0]);
  }
}

export default new UserControler();
