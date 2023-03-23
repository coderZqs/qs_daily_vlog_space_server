import { sequelize, DataTypes } from "../utils/connect";

export default sequelize.define(
  "chat_records",
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
    is_remove: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    belong_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    msg_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "chat_records",
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
