import moment from "moment";
import { SUCCESS, USER_NO_PERMISSION } from "./../http/response-status";
import chatService from "../service/chat";
import type OkPacket from "mysql";

class ChatControler {
  async getGroupChat(ctx) {}
  getFriendChat() {}
  async getFriend(ctx) {
    let data = (await chatService.getGroup({
      user_id: ctx.state.user_id,
    })) as [];

    SUCCESS(ctx, data);
  }
  
  async getGroup(ctx) {
    let data = (await chatService.getGroup({
      user_id: ctx.state.user_id,
    })) as [];

    SUCCESS(ctx, data);
  }

  addChat() {}
  removeChat() {}

  async addGroup(ctx) {
    let { group_name } = ctx.request.body;
    let nowTime = moment().format("YYYY-MM-DD hh:mm:ss");

    let result: OkPacket = await chatService.addGroup({
      group_name,
      user_id: ctx.state.user_id,
      created_at: nowTime,
    });

    await chatService.addGroupRemember({
      group_id: result.insertId,
      user_id: ctx.state.user_id,
      created_at: nowTime,
    });

    SUCCESS(ctx);
  }

  async removeGroup(ctx) {
    let { id } = ctx.params as { id: number };
    try {
      // 判断这个群的群主是否该成员
      let data = (await chatService.judgeGroupLeader({
        group_id: id,
        user_id: ctx.state.user_id,
      })) as [];

      if (!data || !data.length) {
        return USER_NO_PERMISSION(ctx);
      } else {
        await chatService.removeGroup({ group_id: id });
        SUCCESS(ctx);
      }
    } catch (err) {}
  }
}

export default new ChatControler();
