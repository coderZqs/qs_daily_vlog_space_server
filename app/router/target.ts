import Router from "koa-router";
let router = new Router({ prefix: "/target" });
import targetControler from "../controler/target";

router.get("/", targetControler.find);
router.post("/", targetControler.add);

export default router;
