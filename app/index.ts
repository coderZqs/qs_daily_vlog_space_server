import Koa from "koa";
import { Server } from "http";
import staticServe from "koa-static";
import IndexRouter from "./router/index";
import UserRouter from "./router/user";
import BlogRouter from "./router/blog";
import CommentRouter from "./router/comment";
import friendShipRouter from "./router/friendShip";
import BillRouter from "./router/bill";
import ChatRouter from "./router/chat";
import TargetRouter from "./router/target";
import CalendarRouter from "./router/calendar";
import responseMiddleWare from "./middleWares/response";
import koaBody from "koa-body";
import path from "path";
import jwt from "jsonwebtoken";
import config from "./config/config";
import { USER_ACCOUNT_EXPIRED, USER_NOT_LOGIN } from "./http/response-status";
import dotenv from "dotenv";

const app = new Koa();
dotenv.config();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "./public/uploads"),
    },
  })
);

app.use(staticServe(path.join(__dirname, "./public/uploads")));

app.use(async (ctx, next) => {
  let url = ctx.url.split("?")[0];
  let whiteList = ["/user/login", "/user/register"];

  if (whiteList.includes(url) || url.includes("/app/public/uploads")) {
    await next();
  } else {
    let token = ctx.request.headers["authorization"];
    if (token) {
      const tokenItem = jwt.verify(token, config.jwt.jwt_secret);
      let { time, timeout, id } = tokenItem;
      let now = new Date().getTime();

      if (now - time <= timeout) {
        ctx.state.user_id = id;
        await next();
      } else {
        USER_ACCOUNT_EXPIRED(ctx);
      }
    } else {
      USER_NOT_LOGIN(ctx);
    }
  }
});

app.use(IndexRouter.routes());
app.use(UserRouter.routes());
app.use(BlogRouter.routes());
app.use(CommentRouter.routes());
app.use(friendShipRouter.routes());
app.use(ChatRouter.routes());
app.use(BillRouter.routes());
app.use(TargetRouter.routes());
app.use(CalendarRouter.routes());

app.use(async (ctx, next) => {
  responseMiddleWare(ctx, next);
});

app.onerror = (err) => {
  console.log(err);
};

const run = (port: number): Server => {
  return app.listen(port);
};

export default run;
