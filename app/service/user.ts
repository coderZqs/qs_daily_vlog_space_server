/**
 * @deprecated 废弃
 */

/* import query from "../utils/mysql";
import { UserParams } from "../types/index";
import UserModel from "../models/user";
import { encrypt, decrypt } from "../utils/crypto";
import JwtAuth from "../utils/jwt"; */

export default {
  /**
   * 登录
   */

  async login(params: { password: string; mobile: number }) {
    /* let { password, mobile } = params;
    let data = await UserModel.findOne({ where: { mobile: mobile } });
    if (data?.toJSON().length) {
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
        return { status: "success", data: token };
      } else {
        return { status: "error" };
      }
    }
    /*   return await query(
      `select * from user where username = ${params.username} and password = '${params.password}'`
    ); */
  },

  /**
   * 注册
   */

  async register(params: UserParams) {
    /*  await query(
      `insert into user(username,password,mobile) values('${params.username}','${params.password}',${params.mobile})`
    );

    let id = await query("SELECT @@IDENTITY AS ID");
    return id; */
  },

  /**
   * 判断是否手机号已注册
   */

  async judgeRegister(mobile: number) {
    /*  return await query(`select id from user where mobile = ${mobile}`); */
  },

  async findUser(params: {}) {
    /*   let addition = "";
    let fuzzyKeyList = ["username", "mobile"]; //模糊查询列表

    for (let key in params) {
      if (fuzzyKeyList.includes(key)) {
        addition += key + " like %" + params[key] + "%";
      } else {
        addition += key + "=" + params[key];
      }

      let lastKey = Object.keys(params)
        .reverse()
        .find((item, index) => index === 0);

      if (key !== lastKey) {
        addition += "and";
      }
    }

    return await query(`select * from user where ${addition}`); */
  },
};
