import { SUCCESS, NO_RECORD, CANT_REWRITE } from "./../http/response-status";
import { Context } from "koa";
import Target from "../models/target";
import _ from "lodash";
import Utils from "../utils/index";
import { Op } from "sequelize";

const generateAddition = (params) => {
  let struct = {
    id: "eq",
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

class TargetControler {
  async add(ctx: Context) {
    let params = ctx.request.body;
    let { startTime, endTime } = Utils.getRangeTimeByTimeStamp(
      params.created_at
    );

    let result = await Target.findOne({
      where: {
        created_at: { [Op.gt]: startTime, [Op.lt]: endTime },
        user_id: ctx.state.user_id,
      },
    });

    if (result) {
      CANT_REWRITE(ctx);
    } else {
      await Target.create({
        content: params.content,
        status: 1,
        user_id: ctx.state.user_id,
        created_at: params.created_at,
      });

      SUCCESS(ctx);
    }
  }

  async update(ctx) {
    let params = ctx.request.body;

    let result = await Target.findOne({ where: { id: params.id } });
    if (!result) {
      NO_RECORD(ctx);
    } else {
      await Target.update(
        { status: params.status, content: params.content },
        { where: { id: params.id } }
      );

      return SUCCESS(ctx);
    }
  }

  async find(ctx: Context) {
    let params = ctx.query;
    params.user_id = ctx.state.user_id;
    let addition = generateAddition(params);

    let data = (await Target.findAll({ where: { ...addition } })) as {}[];
    SUCCESS(ctx, data);
  }

  async remove(ctx: Context) {
    let id = ctx.params.id;

    await Target.destroy({ where: { user_id: ctx.state.id, id: id } });
    SUCCESS(ctx);
  }
}

export default new TargetControler();
