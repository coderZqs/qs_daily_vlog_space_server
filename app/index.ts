import Koa from "koa";
import { Server } from "http"
import router from "./router/index"
const app = new Koa();

app.use(router.routes());

const run = (port: number): Server => {
    return app.listen(port)
}

export default run;