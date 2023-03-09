import Run from "./app/index"
import config from "./app/config/config"

Run(Number(config.server.port));