import app from "./app.ts";
import config from "./config/config.ts";
import { createServer } from "http";
import { Server } from "socket.io";
import { rechargeWorker } from "./controllers/rechargeWorker.ts";

const server = createServer(app);
export const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('start-recharge', (room: string) => {
        socket.join(room)
        console.log("Join the room : " + room);
    })

    socket.on('rechargeUpdate', (...args) => {
        console.log("rechargeUpdate: " + args)
        io.emit('rechargeUpdate', args);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

rechargeWorker();

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
