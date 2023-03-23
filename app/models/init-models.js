var DataTypes = require("sequelize").DataTypes;
var _bill = require("./bill");
var _black_list = require("./black_list");
var _blog = require("./blog");
var _chat_records = require("./chat_records");
var _comment = require("./comment");
var _friendship = require("./friendship");
var _group = require("./group");
var _group_user_merge = require("./group_user_merge");
var _invitation = require("./invitation");
var _likenoun = require("./likenoun");
var _target = require("./target");
var _user = require("./user");

function initModels(sequelize) {
  var bill = _bill(sequelize, DataTypes);
  var black_list = _black_list(sequelize, DataTypes);
  var blog = _blog(sequelize, DataTypes);
  var chat_records = _chat_records(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var friendship = _friendship(sequelize, DataTypes);
  var group = _group(sequelize, DataTypes);
  var group_user_merge = _group_user_merge(sequelize, DataTypes);
  var invitation = _invitation(sequelize, DataTypes);
  var likenoun = _likenoun(sequelize, DataTypes);
  var target = _target(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  return {
    bill,
    black_list,
    blog,
    chat_records,
    comment,
    friendship,
    group,
    group_user_merge,
    invitation,
    likenoun,
    target,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
