import KoaRouter from "koa-router";
import BlogControler from "../controler/blog";
let router = new KoaRouter({ prefix: "/blog" });

router.post("/", BlogControler.add);
router.get("/", BlogControler.find);

export default router;
