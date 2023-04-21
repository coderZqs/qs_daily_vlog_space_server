import { SUCCESS, CANT_REWRITE, NO_RECORD } from "./../http/response-status";
import { Context } from "koa";
import Calendar from "../models/calendar";
import _ from "lodash";
import Utils from "../utils/index";
import { Op } from "sequelize";
import query from "../utils/mysql";

const generateAddition = (params) => {
  let struct = {
    id: "eq",
    date: "range",
    startTime: "range",
    endTime: "range",
  };

  let addition = Utils.generateSQL(struct, Utils.formatParams(params));
  if (params.startTime && params.endTime) {
    addition["date"] = {
      [Op.between]: [
        Utils.formatTime(params.startTime),
        Utils.formatTime(params.endTime),
      ],
    };
  }

  return addition;
};

class CalendarControler {
  async get(ctx) {
    let result = await Calendar.findAll({
      where: {
        ...generateAddition(ctx.query),
      },
    });

    SUCCESS(ctx, result);
  }

  async update(ctx) {
    let params = {};
    let updateKey = ["task", "countdown", "date", "bgcolor"];

    for (let key in ctx.request.body) {
      if (updateKey.includes(key)) {
        params[key] = ctx.request.body[key];
      }
    }

    await Calendar.update(
      { ...params },
      { where: { id: ctx.request.body.id } }
    );

    SUCCESS(ctx);
  }

  async add(ctx) {
    let { task, countdown, date, bgcolor } = ctx.request.body;
    let { startTime, endTime } = Utils.getStartAndEndByTimestamp(date);
    let isExist = await Calendar.findOne({
      where: {
        date: { [Op.gt]: startTime, [Op.lt]: endTime },
      },
    });

    if (isExist) {
      CANT_REWRITE(ctx);
    } else {
      await Calendar.create({
        task: task,
        countdown: countdown,
        date: Utils.formatTime(date),
        bgcolor: bgcolor,
        user_id: ctx.state.user_id,
      });

      SUCCESS(ctx);
    }
  }
}

export default new CalendarControler();
