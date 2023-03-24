import { Op } from "sequelize";
import moment from "moment";

export default {
  //  处理参数
  formatParams(params) {
    let returnParams = {};
    for (let key in params) {
      if (params[key]) {
        returnParams[key] = params[key];
      }
    }

    return returnParams;
  },

  /**
   * 通过时间
   * @param time
   * @param options
   * @returns
   */

  getRangeTimeByTimeStamp(
    time,
    options: { type: any; count: number } = { type: "day", count: 1 }
  ) {
    let startTime = moment(time, "x").format("YYYY-MM-DD hh:mm:ss");
    let endTime = moment(time, "x")
      .add(options.count, options.type)
      .format("YYYY-MM-DD hh:mm:ss");

    return { startTime, endTime };
  },

  /**
   * 通过 stuct生成语句
   * @param struct
   * @param params
   * @returns
   */

  generateSQL(struct, params) {
    let addition = {};
    for (let key in params) {
      switch (struct[key]) {
        case "like":
          addition[key] = { [Op.like]: params[key] };
          break;
        case "eq":
          addition[key] = { [Op.eq]: params[key] };
          break;
      }
    }

    return addition;
  },
};
