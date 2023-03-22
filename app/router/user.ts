import dotenv from "dotenv";
dotenv.config();
import Router from "koa-router";
import UserControler from "../controler/user";
const router = new Router({
  prefix: "/user",
});

router.post("/login", UserControler.login);
router.post("/register", UserControler.register);
router.get("/info", UserControler.getInfo);
export default router;
