import { sequelize, DataTypes } from "../utils/connect";

export default sequelize.define(
  "likenoun",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(""),
      allowNull: false,
      comment: "1.博客点赞 2.评论点赞.3.回复点赞",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "likenoun",
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
