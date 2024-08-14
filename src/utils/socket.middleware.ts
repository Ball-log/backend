import { Server as SocketIOServer, Socket } from "socket.io";
import { Server } from "http";
import redisClient from "./../../config/db.redis";

let io: SocketIOServer;

export function setupSocketIO(server: Server) {
    io = new SocketIOServer(server);

    io.on("connection", async (socket: Socket) => {
        socket.data.user_id = socket.handshake.query.user_id as string;
        console.log("A user connected", socket.data.user_id, socket.id);
        await redisClient.set(socket.data.user_id + "_socket", socket.id);

        // 연결 종료 처리
        socket.on("disconnect",  async () => {
            console.log("User disconnected");
        });
    });

    return io;
}

export function getSocketIO() {
    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }
    return io;
}
