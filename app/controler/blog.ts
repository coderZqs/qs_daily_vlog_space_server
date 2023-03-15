import { SUCCESS } from "./../http/response-status";
import { Context } from "koa";
import { BlogParams } from "../types/index";
import blogService from "../service/blog";
import moment from "moment";

class BlogControler {
  async add(ctx: Context, next) {
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
      user_id: ctx.state.user_id,
    });

    if (data) {
      SUCCESS(ctx);
    }

    await next();
  }

  async find(ctx: Context, next) {
    // 查询当天时间下的所有日记
    let dayTime = ctx.query.dayTime as string;

    if (dayTime) {
      let data = (await blogService.findBlogByDayTime(
        dayTime,
        ctx.state.user_id
      )) as [];
      if (data && data.length) {
        SUCCESS(ctx, data);
      }
    }

    await next();
  }

  // 点赞

  async like() {}
}

export default new BlogControler();
