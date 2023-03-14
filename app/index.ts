import Koa from "koa";
import { Server } from "http";
import bodyParser from "koa-bodyparser";
import IndexRouter from "./router/index";
import UserRouter from "./router/user";
import responseMiddleWare from "./middleWares/response";
const app = new Koa();

import dotenv from "dotenv";
dotenv.config();

app.use(bodyParser());

app.use(IndexRouter.routes());
app.use(UserRouter.routes());

app.use(async (ctx, next) => {
  responseMiddleWare(ctx, next);
});

app.onerror = (err) => {
  console.log(err.message);
};

const run = (port: number): Server => {
  return app.listen(port);
};

export default run;
