import Router from "koa-router";
let router = new Router({ prefix: "/comment" });
import CommentControler from "../controler/comment";

router.get("/", CommentControler.find);
router.post("/", CommentControler.reply);

export default router;
