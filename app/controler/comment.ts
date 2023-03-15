import { SUCCESS } from "./../http/response-status";
import { CommentParams } from "./../types/index";
import commentService from "../service/comment";

class CommentControler {
  /**
   * 查询
   */

  async find(ctx) {
    let { blog_id, comment_id } = ctx.query as {
      blog_id: number;
      comment_id: number;
    };

    let data = [];
    if (comment_id) {
      data = (await commentService.findReplyByCommentId(comment_id)) as [];
    } else {
      data = (await commentService.findCommentByBlogId(blog_id)) as [];
    }

    SUCCESS(ctx, data);
  }

  /**
   * 评论
   */

  async reply(ctx) {
    let { belong_id, type, content } = ctx.request.body as CommentParams;

    try {
      await commentService.add({
        belong_id,
        type,
        content,
        user_id: ctx.state.user_id,
      });

      SUCCESS(ctx);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CommentControler();
