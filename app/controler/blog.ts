import { SUCCESS, BLOG_IS_TODAY_WRITED } from "./../http/response-status";
import { Context } from "koa";
import { BlogParams } from "../types/index";
import blogService from "../service/blog";
import moment from "moment";
import _ from "lodash";

class BlogControler {
  async add(ctx: Context) {
    let { title, category, content, created_at } = ctx.request
      .body as BlogParams;

    if (created_at) {
      created_at = moment(created_at, "x").format("YYYY-MM-DD hh:mm:ss");
    }

    // 判断今天是否已经记录过。

    let isWrite = await blogService.judgeTodayISWrite();
    if (isWrite) {
      return BLOG_IS_TODAY_WRITED(ctx);
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
  }

  async find(ctx: Context) {
    let created_at = ctx.query.created_at as string;

    let params = {
      created_at: created_at,
      user_id: ctx.state.user_id,
    };

    let data = (await blogService.findBlog(
      _.pickBy(params, _.identity)
    )) as {}[];
    SUCCESS(ctx, data[0]);
  }

  async remove(ctx: Context) {
    let id = ctx.params.id;

    await blogService.remove({
      user_id: ctx.state.id,
      id: id,
    });

    SUCCESS(ctx);
  }

  // 点赞

  async like() {}
}

export default new BlogControler();
