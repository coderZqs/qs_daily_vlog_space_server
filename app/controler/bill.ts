import { SUCCESS, CANT_REWRITE, NO_RECORD } from "./../http/response-status";
import { Context } from "koa";
import Bill from "../models/bill";
import _ from "lodash";
import Utils from "../utils/index";
import { Op } from "sequelize";
import query from "../utils/mysql";

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

class BillControler {
  async add(ctx: Context) {
    let params = ctx.request.body;
    let { startTime, endTime } = Utils.getRangeTimeByTimeStamp(
      params.created_at
    );

    let result = await Bill.findOne({
      where: {
        created_at: { [Op.gt]: startTime, [Op.lt]: endTime },
        user_id: ctx.state.user_id,
      },
    });

    if (result) {
      CANT_REWRITE(ctx);
    } else {
      await Bill.create({
        details: JSON.stringify(params.details),
        user_id: ctx.state.user_id,
        created_at: params.created_at,
        remark: params.remark,
      });

      SUCCESS(ctx);
    }
  }

  async update(ctx) {
    let params = ctx.request.body;

    let result = await Bill.findOne({ where: { id: params.id } });
    if (!result) {
      NO_RECORD(ctx);
    } else {
      await Bill.update(
        { details: params.details, remark: params.remark },
        { where: { id: params.id } }
      );

      return SUCCESS(ctx);
    }
  }

  async find(ctx: Context) {
    let params = ctx.query;
    params.user_id = ctx.state.user_id;
    let addition = generateAddition(params);

    let data = (await Bill.findAll({ where: { ...addition } })) as {}[];
    SUCCESS(ctx, data);
  }

  async remove(ctx: Context) {
    let id = ctx.params.id;

    await Bill.destroy({ where: { user_id: ctx.state.id, id: id } });
    SUCCESS(ctx);
  }

  async getCategory(ctx) {
    let data = (await query(`select * from bill_type`)) as [];
    SUCCESS(ctx, data);
  }
}

export default new BillControler();
