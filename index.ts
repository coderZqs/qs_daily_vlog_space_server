import run from "./app/index";
import config from "./app/config/config";
import socketInit from "./app/socket";
let socket = require("socket.io");
import {} from "socket.io";
let server = run(Number(config.server.port));

let io = socket(server);
socketInit(io);
