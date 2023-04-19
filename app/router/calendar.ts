import Router from "koa-router";
import CalendarControler from "../controler/calendar";
let router = new Router({ prefix: "/calendar" });

router.get("/", CalendarControler.get);
router.put("/", CalendarControler.update);
router.post("/", CalendarControler.add);

export default router;
