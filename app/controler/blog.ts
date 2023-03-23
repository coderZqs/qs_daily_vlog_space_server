import { SUCCESS, BLOG_IS_TODAY_WRITED } from "./../http/response-status";
import { Context } from "koa";
import { BlogParams } from "../types/index";
import blogService from "../service/blog";
import Blog from "../models/blog";
import _ from "lodash";
import { Op } from "sequelize";

class BlogControler {
  async add(ctx: Context) {
    let { title, category, content, created_at } = ctx.request
      .body as BlogParams;

    let result = await Blog.findOne({
      where: {
        created_at: {
          [Op.gt]: new Date("2023-03-23"),
          [Op.lt]: new Date("2023-03-24"),
        },
      },
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

    let data = (await Blog.findAll({ where: { ...params } })) as {}[];
    SUCCESS(ctx, data);
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
