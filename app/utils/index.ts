import { Op } from "sequelize";
import moment from "moment";
import fs from "fs";
import path from "path";

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
    let startTime = this.formatTime(time);
    let endTime = moment(time, "x")
      .add(options.count, options.type)
      .format("YYYY-MM-DD HH:mm:ss");

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

  async uploadFile(file) {
    return new Promise(async (resolve, reject) => {
      const reader = fs.createReadStream(file.filepath);
      const ext = file.originalFilename.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const stream = fs.createWriteStream(
        path.resolve(__dirname, `../public/uploads/${fileName}`)
      );
      reader.pipe(stream);

      reader.on("end", () => {
        resolve({ fileName });
      });

      reader.on("error", () => {
        reject(0);
      });
    });
  },

  /**
   * 通过时间戳格式化数据库格式
   */

  formatTime(timestamp?: number): string {
    if (timestamp) {
      return moment(timestamp, "x").format("YYYY-MM-DD HH:mm:ss");
    } else {
      return moment().format("YYYY-MM-DD HH:mm:ss");
    }
  },

  /**
   * 通过时间戳获取某天的开始到结束
   */

  getStartAndEndByTimestamp(timestamp) {
    let date = new Date(Number(timestamp));
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let newDate = new Date(year, month, day, 0, 0).getTime();
    return this.getRangeTimeByTimeStamp(newDate);
  },
};
