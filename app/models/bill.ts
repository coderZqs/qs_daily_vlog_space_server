import { sequelize, DataTypes } from "../utils/connect";

import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class BillModel extends Model<
  InferAttributes<BillModel>,
  InferCreationAttributes<BillModel>
> {
  declare id: CreationOptional<number>;
  declare details: string;
  declare user_id: number;
  declare created_at: string;
}

export default BillModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.TEXT,
    },

    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "bill",
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
