import query from "../utils/mysql";
import { CommentType, CommentParams } from "../types/index";

export default {
  findCommentByBlogId(blog_id: number) {
    return query(
      `select * from comment where belong_id = ${blog_id} and type = ${CommentType.comment}`
    );
  },

  findReplyByCommentId(comment_id: number) {
    return query(`
    select * from comment where belong_id = ${comment_id} and type = ${CommentType.reply} 
    `);
  },

  add(params: CommentParams) {
    console.log(params);
    return query(
      `insert into comment(user_id,belong_id,type,content) values(${params.user_id}, ${params.belong_id},${params.type}, '${params.content}')`
    );
  },
};
