import query from "../utils/mysql";
import { BlogParams } from "../types/index";

/**
 * 记录
 */

export default {
  addBlog(params: BlogParams) {
    return query(
      `insert into blog(title,content,category,created_at,user_id) values('${params.title}','${params.content}',${params.category},'${params.created_at}',${params.user_id})`
    );
  },

  /**
   *
   * @param date yyyy-mm-dd
   * @returns
   */

  async findBlogByDayTime(date: string, user_id: number) {
    return query(
      `select * from blog where date_format(created_at,'%Y-%m-%d') = '${date}' and user_id= ${user_id}`
    );
  },

  async findBlog(params: BlogParams) {
    let addition = "";
    let fuzzyKeyList = ["title"]; //模糊查询列表

    for (let key in params) {
      if (fuzzyKeyList.includes(key)) {
        addition += key + "like%" + params[key] + "%";
      } else {
        // 精准
        addition += key + "=" + params[key];
      }

      let lastKey = Object.keys(params)
        .reverse()
        .find((item, index) => index === 0);

      if (key !== lastKey) {
        addition += "and";
      }
    }

    return await query(`select * from blog where ${addition}`);
  },
};
