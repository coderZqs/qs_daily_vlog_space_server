import dotenv from "dotenv";
dotenv.config();
import Router from "koa-router";
import IndexControler from "../controler/index";
const router = new Router({
  prefix: "/admin",
});

router.get("/", IndexControler.index);
export default router;
