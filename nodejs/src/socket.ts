import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('start-recharge', (room: string) => {
            socket.join(room)
            console.log("Join the room : " + room);
        });

        socket.on('rechargeUpdate', (...args) => {
            console.log("rechargeUpdate: " + args)
            io.emit('rechargeUpdate', args);
        });

        socket.on('stop-recharge', (room: string) => {
            socket.leave(room)
            console.log("Left the room : " + room);
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return io;
};