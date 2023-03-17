import query from "../utils/mysql";
import { UserParams } from "../types/index";

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
   * 判断是否拥有用户
   */

  async judgeExistUserByMobile(mobile: number) {
    return await query(`select * from user where mobile = ${mobile}`);
  },

  /**
   * 注册
   */

  async register(params: UserParams) {
    await query(
      `insert into user(username,password,mobile) values('${params.username}','${params.password}',${params.mobile})`
    );

    let id = await query("SELECT @@IDENTITY AS ID");
    return id;
  },

  /**
   * 判断是否手机号已注册
   */

  async judgeRegister(mobile: number) {
    return await query(`select id from user where mobile = ${mobile}`);
  },

  async findUser(params: {}) {
    let addition = "";
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

    return await query(`select * from user where ${addition}`);
  },
};
