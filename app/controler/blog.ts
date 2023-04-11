import { SUCCESS, CANT_REWRITE } from "./../http/response-status";
import { Context } from "koa";
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
    let { title, category, content, created_at, weather, image } =
      ctx.request.body;
    let params = { title, category, content, created_at, weather };
    let { startTime, endTime } = Utils.getRangeTimeByTimeStamp(created_at);

    let result = await Blog.findOne({
      where: {
        created_at: { [Op.gt]: startTime, [Op.lt]: endTime },
        user_id: ctx.state.user_id,
      },
    });

    if (result) {
      return CANT_REWRITE(ctx, "请勿重复记录");
    }

    Blog.create({
      ...params,
      image: image,
      user_id: ctx.state.user_id,
    });

    SUCCESS(ctx);
  }

  async find(ctx: Context) {
    let params = ctx.query;
    console.log(params);
    params.user_id = ctx.state.user_id;
    let addition = generateAddition(params);

    let data = (await Blog.findAll({
      where: { ...addition },
      order: [["created_at", "DESC"]],
    })) as {}[];
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
