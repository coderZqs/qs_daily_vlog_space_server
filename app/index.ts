import Koa from "koa";
import { Server } from "http";
import bodyParser from "koa-bodyparser";
import IndexRouter from "./router/index";
import UserRouter from "./router/user";
import BlogRouter from "./router/blog";
import CommentRouter from "./router/comment";
import responseMiddleWare from "./middleWares/response";
import jwt from "jsonwebtoken";
import config from "./config/config";
import { USER_ACCOUNT_EXPIRED, USER_NOT_LOGIN } from "./http/response-status";
import dotenv from "dotenv";

const app = new Koa();
dotenv.config();

app.use(bodyParser());

app.use(async (ctx, next) => {
  let url = ctx.url.split("?")[0];
  let whiteList = ["/user/login", "/user/register"];

  if (whiteList.includes(url)) {
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
