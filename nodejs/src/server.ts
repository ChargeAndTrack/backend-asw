import app from "./app.ts";
import config from "./config/config.ts";
import { createServer } from "http";
import { rechargeWorker } from "./controllers/rechargeWorker.ts";
import { initSocket } from "./socket.ts";

export const server = createServer(app);
initSocket(server);

rechargeWorker();

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
