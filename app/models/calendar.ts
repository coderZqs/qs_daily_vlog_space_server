import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize, DataTypes } from "../utils/connect";

class CalendarModel extends Model<
  InferAttributes<CalendarModel>,
  InferCreationAttributes<CalendarModel>
> {
  declare id?: CreationOptional<number>;
  declare task?: string;
  declare bgcolor?: string;
  declare countdown?: string;
  declare user_id?: number;
  declare date: string;
  declare created_at?: string;
}

export default CalendarModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    task: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    bgcolor: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    countdown: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    tableName: "calendar",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);
