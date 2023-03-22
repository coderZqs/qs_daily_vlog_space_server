import query from "../utils/mysql";
import { BlogParams } from "../types/index";
import moment from "moment";

/**
 * 记录
 */

export default {
  addBlog(params: BlogParams) {
    return query(
      `insert into blog(title,content,category,created_at,user_id) values('${params.title}','${params.content}',${params.category},'${params.created_at}',${params.user_id})`
    );
  },

  async judgeTodayISWrite() {
    let today = moment().format("YYYY-MM-DD");
    let result = (await query(
      `select * from blog where (datediff(created_at , '${today}') = 0)`
    )) as [];

    return Boolean(result && result.length);
  },

  async findBlog(params: BlogParams) {
    let addition = "";
    let fuzzyKeyList = ["title"]; //模糊查询列表

    for (let key in params) {
      if (key === "created_at") {
        if (params[key]) {
          addition += `(datediff('${key}', '${params[key]}') = 0)`;
        }
      } else if (fuzzyKeyList.includes(key)) {
        addition += key + "like%" + params[key] + "%";
      } else {
        // 精准
        addition += key + "=" + params[key];
      }

      let lastKey = Object.keys(params)
        .reverse()
        .find((item, index) => index === 0);

      if (key !== lastKey) {
        addition += " and ";
      }
    }

    return await query(`select * from blog where ${addition}`);
  },

  async remove(params) {
    return query(
      `delete from blog where user_id = ${params.user_id} and id = ${params.id}`
    );
  },
};
