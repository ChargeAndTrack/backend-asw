import app from "./app.ts";
import config from "./config/config.ts";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
export const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('recharge', (msg: string) => {
        io.emit('recharge', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
