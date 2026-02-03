import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('start-recharge', (id: string) => {
            socket.join(`car:${id}`);
            console.log("Join the room: " + `car:${id}`);
        });

        socket.on('stop-recharge', (id: string) => {
            socket.leave(`car:${id}`);
            console.log("Left the room: " + `car:${id}`);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return io;
};
