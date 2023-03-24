import { SUCCESS, BLOG_IS_TODAY_WRITED } from "./../http/response-status";
import { Context } from "koa";
import { BlogParams } from "../types/index";
import blogService from "../service/blog";
import Blog from "../models/blog";
import _ from "lodash";
import Utils from "../utils/index";
import { Op } from "sequelize";

class BlogControler {
  async add(ctx: Context) {
    let { title, category, content, created_at } = ctx.request
      .body as BlogParams;
    let params = { title, category, content, created_at };

    let result = await Blog.findOne({
      where: { ...Utils.formatParams(params) },
    });

    if (result) {
      return BLOG_IS_TODAY_WRITED(ctx);
    }

    Blog.create({
      title,
      category,
      content,
      created_at,
      user_id: ctx.state.user_id,
    });

    SUCCESS(ctx);
  }

  async find(ctx: Context) {
    let params = ctx.query;
    params.user_id = ctx.state.user_id;

    let struct = {
      title: "like",
      category: "eq",
      content: "like",
      sort_id: "eq",
      user_id: "eq",
      created_at: "range",
    };

    let addition = Utils.generateSQL(struct, Utils.formatParams(params));
    if (params.created_at) {
      let { startTime, endTime } = Utils.getRangeTimeByTimeStamp(
        params.created_at
      );
      addition["created_at"] = { [Op.gt]: startTime, [Op.lt]: endTime };
    }

    let data = (await Blog.findAll({ where: { ...addition } })) as {}[];
    SUCCESS(ctx, data);
  }

  async remove(ctx: Context) {
    let id = ctx.params.id;
    await blogService.remove({ user_id: ctx.state.id, id: id });
    SUCCESS(ctx);
  }

  // 点赞

  async like() {}
}

export default new BlogControler();
