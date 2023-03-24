import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize, DataTypes } from "../utils/connect";

class BlogModel extends Model<
  InferAttributes<BlogModel>,
  InferCreationAttributes<BlogModel>
> {
  declare id: CreationOptional<number>;
  declare title?: string;
  declare category?: string;
  declare content?: string;
  declare sort_id?: number;
  declare user_id?: number;
  declare created_at?: string;
}

export default BlogModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(""),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sort_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelize,
    underscored: true,
    tableName: "blog",
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
