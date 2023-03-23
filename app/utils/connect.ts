const sequelizeConfig = require("../config/sequelize");
const { Sequelize, DataTypes, Op } = require("sequelize"); // 引入sequelize依赖

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    dialect: sequelizeConfig.dialect,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    host: sequelizeConfig.host,
    port: sequelizeConfig.port,
    logging: sequelizeConfig.logging,
    pool: sequelizeConfig.pool,
    define: sequelizeConfig.define,
    timezone: "+08:00",
  }
);

export default {
  sequelize,
  DataTypes,
  Op,
};
