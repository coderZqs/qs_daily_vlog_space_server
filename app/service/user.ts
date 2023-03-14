import query from "../utils/mysql";
import { RegisterParams } from "../types/index";

export default {
  /**
   * 登录
   */

  async login() {
    return await query("select * from user");
  },

  /**
   * 注册
   */

  async register(params: RegisterParams) {
    return await query(
      `insert into user(username,password,mobile) values('${params.username}','${params.password}',${params.mobile})`
    );
  },

  /**
   * 判断是否手机号已注册
   */

  async judgeRegister(mobile: string) {
    return await query(`select id from user where mobile = ${mobile}`);
  },
};
