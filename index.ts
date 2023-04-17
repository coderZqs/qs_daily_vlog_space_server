import run from "./app/index";
import config from "./app/config/config";
import WS from "./app/socket/index";
let server = run(Number(config.server.port));
console.log(server)
WS.init(server);
