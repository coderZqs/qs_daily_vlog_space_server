import { Context } from "koa";
import logger from "../logger/index"

class IndexControler {
    async index(ctx: Context) {
        logger.info('msg', 'msg')
        ctx.body = [
            1, 2, 3, 4, 5
        ]
    }
}

export default new IndexControler();