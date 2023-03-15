import { SUCCESS } from "./../http/response-status";
import { Context } from "koa";
import { BlogParams } from "../types/index";
import blogService from "../service/blog";
import moment from "moment";

class BlogControler {
  async add(ctx: Context) {
    let { title, category, content, created_at } = ctx.request
      .body as BlogParams;

    if (created_at) {
      created_at = moment(created_at, "X").format("YYYY-MM-DD hh:mm:ss");
    }

    let data = await blogService.addBlog({
      title,
      category,
      content,
      created_at,
    });

    if (data) {
      SUCCESS(ctx);
    }
  }

  async find(ctx: Context) {
    // 查询当天时间下的所有日记
    let dayTime = ctx.query.dayTime as string;

    console.log(dayTime);

    if (dayTime) {
      let data = (await blogService.findBlogByDayTime(dayTime)) as [];
      if (data && data.length) {
        SUCCESS(ctx, data);
      }
    }
  }
}

export default new BlogControler();
