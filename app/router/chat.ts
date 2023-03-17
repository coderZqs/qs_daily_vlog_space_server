import Router from "koa-router";
import ChatControler from "../controler/chat";
let router = new Router({ prefix: "/chat" });

router.get("/group", ChatControler.getGroup);
router.post("/group", ChatControler.addGroup);
router.delete("/group/:id", ChatControler.removeGroup);

export default router;
