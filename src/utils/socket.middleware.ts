import { Server as SocketIOServer, Socket } from "socket.io";
import { Server } from "http";

let io: SocketIOServer;

export function setupSocketIO(server: Server) {
    io = new SocketIOServer(server);

    io.on("connection", (socket: Socket) => {
        console.log("A user connected");

        // 메시지 수신 이벤트 처리
        socket.on("send_message", (data) => {
            console.log("Message received:", data);

            // 모든 클라이언트에게 메시지 전송
            io.emit("message", {
                type: "message",
                message: data.message,
                user_id: data.user_id
            });
        });

        // 연결 종료 처리
        socket.on("disconnect", () => {
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