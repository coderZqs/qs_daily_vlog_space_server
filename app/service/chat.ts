import query from "../utils/mysql";
export default {
  getGroupChat(params) {},
  getFriendChat() {},
  getFriend() {
    return query(`select * from friendship where user_id = `);
  },
  getGroup(params) {
    return query(
      `select * from group where user_id = belong_id = ${params.user_id}`
    );
  },
  addChat() {},
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
