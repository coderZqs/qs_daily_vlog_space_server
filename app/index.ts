import Koa from "koa";
import { Server } from "http";
import bodyParser from "koa-bodyparser";
import IndexRouter from "./router/index";
import UserRouter from "./router/user";
import responseMiddleWare from "./middleWares/response";
import jwt from "jsonwebtoken";
import config from "./config/config";
import { USER_ACCOUNT_EXPIRED } from "./http/response-status";
import dotenv from "dotenv";

const app = new Koa();
dotenv.config();

app.use(bodyParser());

app.use(IndexRouter.routes());
app.use(UserRouter.routes());

app.use(async (ctx, next) => {
  responseMiddleWare(ctx, next);
});

app.use(async (ctx, next) => {
  let url = ctx.url.split("?")[0];
  let whiteList = ["/user/login", "/user/register"];

  if (whiteList.includes(url)) {
    await next();
  } else {
    let token = ctx.request.headers["authorization"];
    if (token) {
      const tokenItem = jwt.verify(token, config.jwt.jwt_secret);
      let { time, timeout } = tokenItem;
      let now = new Date().getTime();

      if (now - time <= timeout) {
        await next();
      } else {
        USER_ACCOUNT_EXPIRED(ctx);
      }
    }
  }
});

app.onerror = (err) => {
  console.log(err.message);
};

const run = (port: number): Server => {
  return app.listen(port);
};

export default run;
