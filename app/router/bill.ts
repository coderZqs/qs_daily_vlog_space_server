import Router from "koa-router";
import BillControler from "../controler/bill";
let router = new Router({ prefix: "/bill" });

router.post("/", BillControler.add);
router.get("/", BillControler.find);
router.put("/", BillControler.update);
router.get("/category", BillControler.getCategory);

export default router;
