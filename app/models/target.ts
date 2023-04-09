import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize, DataTypes } from "../utils/connect";

class TargetModel extends Model<
  InferAttributes<TargetModel>,
  InferCreationAttributes<TargetModel>
> {
  declare id: CreationOptional<number>;
  declare content?: string;
  declare status?: number;
  declare user_id?: number;
  declare created_at?: string;
}


export default TargetModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "1.完成 2.正在进行 3.未完成",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "target",
    timestamps: true,
    underscored: true,
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
