import query from "../utils/mysql";
import { RegisterParams } from "../types/index";

export default {
  /**
   * 登录
   */

  async login(params: { username: string; password: string }) {
    return await query(
      `select * from user where username = ${params.username} and password = '${params.password}'`
    );
  },

  /**
   * 注册
   */

  async register(params: RegisterParams) {
    await query(
      `insert into user(username,password,mobile) values('${params.username}','${params.password}',${params.mobile})`
    );

    let id = await query("SELECT @@IDENTITY AS ID");

    return id;
  },

  /**
   * 判断是否手机号已注册
   */

  async judgeRegister(mobile: string) {
    return await query(`select id from user where mobile = ${mobile}`);
  },

  async findUser(params: {}) {
    let addition = "";

    for (let key in params) {
      addition += key + "=" + params[key];

      let lastKey = Object.keys(params)
        .reverse()
        .find((item, index) => index === 0);

      if (key !== lastKey) {
        addition += "and";
      }
    }

    console.log(`select id from user where ${addition}`);

    return await query(`select * from user where ${addition}`);
  },
};
