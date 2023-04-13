import {
  SUCCESS,
  USER_ACCOUNT_NOT_EXIST,
  NO_RECORD,
} from "./../http/response-status";
import moment from "moment";

import friendService from "../service/friendShip";
/* import userService from "../service/user"; */
import { InvitationType } from "../types";
import Utils from "../utils/index";

class FriendControler {
  async addInvitation(ctx) {
    let { apply_user_id, status } = ctx.request.body;

    // 判断apply_user_id是否存在

    /* let data = (await userService.findUser({ id: apply_user_id })) as [];
    if (!data || !data.length) {
      return USER_ACCOUNT_NOT_EXIST(ctx);
    } */

    await friendService.addInvitation({
      apply_user_id,
      status,
      user_id: ctx.state.user_id,
      created_at: Utils.formatTime(),
    });

    SUCCESS(ctx);
  }
  async apply(ctx) {
    let id = ctx.params.id as number;
    let status = ctx.request.body.status as InvitationType;

    // 判断是否有该条申请，再判断是否已经有更新的申请处理过

    let data = (await friendService.findInvatation({ id })) as {
      user_id;
      apply_user_id;
    }[];
    if (!data || !data.length) {
      NO_RECORD(ctx);
    } else {
      await friendService.apply({ id, status });
      // 添加好友记录

      if (Number(status) === InvitationType.agree) {
        let { user_id, apply_user_id } = data[0];

        await friendService.addFriend({
          user_id1: user_id,
          user_id2: apply_user_id,
          created_at: Utils.formatTime(),
        });
        SUCCESS(ctx);
      } else {
        SUCCESS(ctx);
      }
    }
  }

  // 获取审核列表
  async getInvitation(ctx) {
    let { pageSize, pageIndex } = ctx.query;
    let data = (await friendService.getInvitation(ctx.state.user_id)) as [];

    SUCCESS(ctx, data);
  }

  async getChat(ctx) {
    /*     let { pageSize, pageIndex } = ctx.query;
    let data = (await friendService.getChat(ctx.state.user_id)) as [];

    SUCCESS(ctx, data); */
  }
  getFriend() {}
  remove() {}
}

export default new FriendControler();
