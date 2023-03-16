import Router from "koa-router";
let router = new Router({ prefix: "/friend" });
import CommentControler from "../controler/friendShip";

router.get("/", CommentControler.getFriend);
router.post("/apply", CommentControler.addInvitation);
router.put("/apply/:id", CommentControler.apply);
router.get("/invitation", CommentControler.getInvitation);
router.delete("/:id", CommentControler.remove);
router.get("/chat_list", CommentControler.getChat);

export default router;
