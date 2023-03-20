import WebSocket, { WebSocketServer } from "ws";
let querystring = require("querystring");
let url = require("url");
import jwt from "jsonwebtoken";
import config from "../config/config";
import chatService from "../service/chat";
import moment from "moment";
import type OkPacket from "mysql";

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

          ws.on("message", async (data) => {
            let { to_id, content, category, msg_type, belong_id } = JSON.parse(
              data.toString()
            );
            let created_at = moment().format("YYYY-MM-DD hh:mm:ss");

            let msg = {
              belong_id: belong_id,
              to_id: to_id,
              created_at: created_at,
              content: content,
              msg_type: msg_type,
              category: category,
            };

            let { insertId }: OkPacket = await chatService.addChat(msg);

            this.ws.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ ...msg, id: insertId }));
              }
            });
          });
          ws.on("close", () => {
            this.online -= 1;

            console.log("当前在线人数" + this.online);
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
