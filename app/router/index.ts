import dotenv from "dotenv";
dotenv.config();
import Router from "koa-router";
import IndexControler from "../controler/index";
const router = new Router({
  prefix: "/common",
});

router.post("/upload", IndexControler.upload);
export default router;
