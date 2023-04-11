import { Context } from "koa";
// import userService from "../service/user";
import {
  USER_ACCOUNT_ALREADY_EXIST,
  SUCCESS,
  USER_ACCOUNT_NOT_EXIST,
  USER_PWD_ERROR,
} from "../http/response-status";
import { encrypt, decrypt } from "../utils/crypto";
import User from "../models/user";
import JwtAuth from "../utils/jwt";

class UserControler {
  async login(ctx: Context) {
    let { mobile, password } = ctx.request.body as {
      mobile: number;
      password: string;
    };

    let data = await User.findOne({ where: { mobile } });

    console.log(3123231);

    if (data) {
      // 判断密码
      let deCryptPassword = decrypt(data.password);
      if (deCryptPassword === password) {
        let tokenData = {
          time: Date.now(),
          timeout: Date.now() + 60000,
          username: data.username,
          id: data.id,
        } as any;
        const token = JwtAuth.signUserToken(tokenData);

        SUCCESS(ctx, token);
      } else {
        USER_PWD_ERROR(ctx);
      }
    } else {
      USER_ACCOUNT_NOT_EXIST(ctx);
    }
  }

  async register(ctx: Context) {
    let { username, password, mobile } = ctx.request.body;
    // 判断是否已注册
    let result = await User.findOne({ where: { mobile: mobile } });

    if (result) {
      await USER_ACCOUNT_ALREADY_EXIST(ctx);
    } else {
      // 加密
      let enCryptPassword = encrypt(password);

      let result = await User.create({
        username,
        password: enCryptPassword,
        mobile,
      });

      let tokenData = {
        time: Date.now(),
        timeout: Date.now() + 60000,
        username: username,
        id: result.id!,
      };
      const token = JwtAuth.signUserToken(tokenData);
      SUCCESS(ctx, token);
    }
  }

  async getInfo(ctx) {
    let data = await User.findOne({ where: { id: ctx.state.user_id } });
    SUCCESS(ctx, data);
  }
}

export default new UserControler();
