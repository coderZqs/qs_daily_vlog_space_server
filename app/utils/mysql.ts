var mysql = require("mysql");

// 建立链接
function __connection() {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "599977..",
    database: "chat_platform",
  });
  connection.connect();
  return connection;
}

const query = function (sql, params = null) {
  var connection = __connection();
  return new Promise(function (reject, resolve) {
    connection.query(sql, params, function (error, results) {
      if (error) throw error;
      reject(results);
    });
    connection.end();
  });
};

export default query;
