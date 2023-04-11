import query from "../utils/mysql";
import { ChatCateogryType } from "../types/index";
export default {
  getGroupChat(params: { group_id: number }) {
    return query(
      `select a.*,u.* (select * from chat_records where group_id = ${params.group_id}) as a left join user as u where u.id = a.user_id`
    );
  },

  getFriendChat(params: { user1: number; user2: number }) {
    return query(
      `select a.*,u.* (select * from chat_records where user_id=${params.user1} and user_id=${params.user2} and group_id = "") as a left join user as u where a.user_id = u.id`
    );
  },

  getFriend() {
    return query(`select * from friendship where user_id = `);
  },

  getGroup(params) {
    return query(
      `select * from group where user_id = belong_id = ${params.user_id}`
    );
  },

  addChat(params) {
    return query(
      `insert into chat_records(content,belong_id,created_at,to_id,msg_type,category) values('${params.content}',${params.belong_id},'${params.created_at}',${params.to_id},${params.msg_type},${params.category})`
    );
  },

  removeChat() {},
  async addGroup(params) {
    return query(
      "insert into " +
        "`group`" +
        `(name,belong_user_id,created_at) values('${params.group_name}', ${params.user_id},'${params.created_at}')`
    );
  },

  removeGroup(params: { group_id: number }) {
    return query(`delete` + "`group`" + `where id = ${params.group_id}`);
  },

  addGroupRemember(params) {
    return query(
      `insert into group_user_merge(group_id,user_id,created_at) values(${params.group_id},${params.user_id},'${params.created_at}')`
    );
  },

  judgeGroupLeader(params) {
    return query(
      "select * from " +
        "`group`" +
        `where belong_user_id = ${params.user_id} and  id = ${params.group_id}`
    );
  },
};

// 撤回
