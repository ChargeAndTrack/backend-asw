import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:4173"]
        }
    });
    io.on('connection', (socket) => {
        console.log('a user connected');
        
        socket.on("join-charging-stations", (chargingStationIds: string[]) => {
            console.log("Joining charging stations: ", chargingStationIds);
            chargingStationIds.forEach((id) => {
                socket.join(`chargingStation:${id}`);
            });
        });

        socket.on("leave-charging-stations", (chargingStationIds: string[]) => {
            console.log("Leaving charging stations: ", chargingStationIds);
            chargingStationIds.forEach((id) => {
                socket.leave(`chargingStation:${id}`);
            });
        });

        socket.on('start-recharge', (carId: string) => {
            socket.join(`car:${carId}`);
            console.log("Join the room: " + `car:${carId}`);
        });

        socket.on('stop-recharge', (id: string) => {
            socket.leave(`car:${id}`);
            console.log("Left the room: " + `car:${id}`);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    return io;
};
