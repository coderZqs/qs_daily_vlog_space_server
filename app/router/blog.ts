import Router from "koa-router";
import BlogControler from "../controler/blog";
let router = new Router({ prefix: "/blog" });

router.post("/", BlogControler.add);
router.get("/", BlogControler.find);
router.delete("/:id", BlogControler.remove);
router.get("/:id", BlogControler.detail);

export default router;
