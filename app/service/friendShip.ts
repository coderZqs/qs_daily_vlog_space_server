import { InvitationType } from "./../types/index";
import query from "../utils/mysql";
import { InvitationParams } from "../types/index";

export default {
  addInvitation(params: InvitationParams) {
    return query(
      `insert into invitation(user_id,apply_user_id,status,created_at,message) values(${params.user_id},${params.apply_user_id},${params.status},'${params.created_at}','${params.message}')`
    );
  },

  apply(params: { status: InvitationType; id: number }) {
    return query(
      `update invitation set status = ${params.status} where id = ${params.id}`
    );
  },

  async addFriend(params: {
    user_id1: number;
    user_id2: number;
    created_at: string;
  }) {
    return query(
      `insert into friendship (user_id,friend_id,created_at) values(${params.user_id1},${params.user_id2},'${params.created_at}'),(${params.user_id2},${params.user_id1},'${params.created_at}')`
    );
  },

  async getInvitation(user_id) {
    return query(`select * from invitation where user_id = ${user_id}`);
  },

  async findInvatation(params) {
    let addition = "";
    let fuzzyKeyList: string[] = []; //模糊查询列表

    for (let key in params) {
      if (fuzzyKeyList.includes(key)) {
        addition += key + " like %" + params[key] + "%";
      } else {
        addition += key + "=" + params[key];
      }

      let lastKey = Object.keys(params)
        .reverse()
        .find((item, index) => index === 0);

      if (key !== lastKey) {
        addition += "and";
      }
    }

    return await query(`select * from invitation where ${addition}`);
  },
};
