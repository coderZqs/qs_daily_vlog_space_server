import { WebSocketServer } from "ws";
let querystring = require("querystring");
let url = require("url");
import jwt from "jsonwebtoken";
import config from "../config/config";

type ChatItemType = {
  user_id: number;
  content: number;
  avatar: number;
};

// 群聊表             groupname,id
// 群聊用户关联表      id,groupid,userid
// 聊天记录表         id,user_id,group_id

// 查询两个用户的聊天记录  select * from chatlist where id = 1 and id = 2 ORDER BY created_at;
// 查询群聊的聊天记录 select * from chatlist where group_id = 1 order by created_at;

class ws {
  static online: number = 0;
  static ws: WebSocketServer;
  static init(server) {
    this.ws = new WebSocketServer({ server });
    this.ws.on("connection", async (ws, request) => {
      var params = querystring.parse(url.parse(request.url).query);

      if (params.token) {
        // 校验token
        const tokenItem = jwt.verify(params.token, config.jwt.jwt_secret);
        let { time, timeout, id } = tokenItem;
        let now = new Date().getTime();
        if (now - time <= timeout) {
          this.online += 1;
          ws.on("message", function message(data) {
            console.log(data);
          });
          ws.on("close", () => {
            this.online -= 1;
            console.log(this.online + "在线人数");
          });
        }
      }
    });
  }

  set online(data) {
    console.log(data);
  }

  static sendToClient() {}
}

export default ws;
