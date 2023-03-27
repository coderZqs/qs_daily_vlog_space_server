import { SUCCESS, BLOG_IS_TODAY_WRITED } from "./../http/response-status";
import { Context } from "koa";
import { BlogParams } from "../types/index";
import blogService from "../service/blog";
import Blog from "../models/blog";
import _ from "lodash";
import Utils from "../utils/index";
import { Op } from "sequelize";
import ip from "ip";
import config from "../config/config";

const generateAddition = (params) => {
  let struct = {
    id: "eq",
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

  return addition;
};

class BlogControler {
  async add(ctx: Context) {
    let file = (ctx.request.files as any).file;
    let { fileName } = (await Utils.uploadFile(file)) as { fileName };
    let { title, category, content, created_at, weather } = ctx.request
      .body as BlogParams;
    let params = { title, category, content, created_at, weather };
    let { startTime, endTime } = Utils.getRangeTimeByTimeStamp(created_at);

    let result = await Blog.findOne({
      where: {
        created_at: { [Op.gt]: startTime, [Op.lt]: endTime },
        user_id: ctx.state.user_id,
      },
    });

    if (result) {
      return BLOG_IS_TODAY_WRITED(ctx);
    }

    Blog.create({
      ...params,
      image:
        "http://" + ip.address() + ":" + config.server.port + "/" + fileName,
      user_id: ctx.state.user_id,
    });

    SUCCESS(ctx);
  }

  async find(ctx: Context) {
    let params = ctx.query;
    console.log(params);
    params.user_id = ctx.state.user_id;
    let addition = generateAddition(params);

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
