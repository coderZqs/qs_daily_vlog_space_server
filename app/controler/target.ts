import { SUCCESS, NO_RECORD, CANT_REWRITE } from "./../http/response-status";
import { Context } from "koa";
import Target from "../models/target";
import _ from "lodash";
import Utils from "../utils/index";
import { Op } from "sequelize";

const generateAddition = (params) => {
  let struct = {
    id: "eq",
    start_at: "range",
    end_at: "range",
  };

  let addition = Utils.generateSQL(struct, Utils.formatParams(params)) as any;

  let startTime = Utils.formatTime(params.start_at);
  let endTime = Utils.formatTime(params.end_at);

  if (startTime && endTime) {
    addition[Op.or] = [
      { start_at: { [Op.between]: [startTime, endTime] } },
      { end_at: { [Op.between]: [startTime, endTime] } },
    ];
  }

  return addition;
};

class TargetControler {
  /**
   * 添加
   * @param ctx
   */

  async add(ctx: Context) {
    let params = ctx.request.body;

    await Target.create({
      content: params.content,
      status: 1,
      user_id: ctx.state.user_id,
      start_at: Utils.formatTime(Number(params.start_at)),
      end_at: Utils.formatTime(Number(params.end_at)),
      created_at: Utils.formatTime(),
    });

    SUCCESS(ctx);
  }

  /**
   * 修改
   * @param ctx
   */

  async update(ctx) {
    let params = ctx.request.body;
    let result = await Target.findOne({ where: { id: params.id } });
    let keys = ["content", "status", "start_at", "end_at"];
    if (!result) {
      NO_RECORD(ctx);
    } else {
      let updateParams = {};
      for (let key in params) {
        if (keys.includes(key)) {
          updateParams[key] = params[key];
        }
      }

      await Target.update({ ...updateParams }, { where: { id: params.id } });

      return SUCCESS(ctx);
    }
  }

  /**
   * 查找
   */

  async find(ctx: Context) {
    let params = ctx.query;
    params.user_id = ctx.state.user_id;
    let addition = generateAddition(params);

    let data = (await Target.findAll({ where: { ...addition } })) as {}[];
    SUCCESS(ctx, data);
  }

  /**
   * 删除
   */

  async remove(ctx: Context) {
    let id = ctx.params.id;

    await Target.destroy({ where: { user_id: ctx.state.user_id, id: id } });
    SUCCESS(ctx);
  }
}

export default new TargetControler();
