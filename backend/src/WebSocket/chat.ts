import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

export function setupWebSocket(server: Server) {

    const wss = new WebSocketServer({ server });

    interface User {
        socket: WebSocket,
        room: string
    }

    let allSockets: User[] = [];


    wss.on("connection", (socket) => {


        socket.on("message", (message) => {
            const parsedMessage = JSON.parse(message.toString());

            // this is to check if the user requested to join a chat room or not
            if(parsedMessage.type === "join") {
                // And if yes then push the user to the main array
                allSockets.push({
                    socket,
                    room: parsedMessage.payload.roomId
                });
            }

            // this is to exit from a room
            if(parsedMessage.type === "exit") {
                allSockets = allSockets.filter(x => x.socket !== socket);
            }

            // This is to check if the user want to send a message or not
            if(parsedMessage.type === "chat") {
                // this will search for the current sending user's room I'd
                const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room;

                // If found then this loop will send the message to all users with same room I'd
                allSockets.forEach((s) => {
                    if(s.room == currentUserRoom) {
                        s.socket.send(parsedMessage.payload.message);
                    }
                })
            }

        });
    })
}