import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";

export function setupWebSocket(server: Server) {

    const wss = new WebSocketServer({ server });

    interface User {
        socket: WebSocket,
        room: string
    }

    interface AuthenticatedSocket extends WebSocket {
        userId?: string;
    }

    let allSockets: User[] = [];

    /*
    
    type: "join",
    payload: {
        roomId: "",
        userId: ""
    }

    type: "chat",
    payload: {
        message: "",
        time: "",
        sender: ""
    }
    
    */


    wss.on("connection", (socket) => {

        const authedSocket = socket as AuthenticatedSocket;

        socket.on("message", (message) => {
            const parsedMessage = JSON.parse(message.toString());

            if(parsedMessage.type === "AUTH") {
                // verify the user
                authedSocket.userId = parsedMessage.payload.userId;
            }

            // this is to check if the user requested to join a chat room or not
            if(parsedMessage.type === "join") {
                // And if yes then push the user to the main array
                allSockets.push({
                    socket,
                    room: parsedMessage.payload.roomId
                });
            }

            // this is to exit from a room
            if(parsedMessage.type === "leave") {
                allSockets = allSockets.filter(x => x.socket !== socket);
            }

            // This is to check if the user want to send a message or not
            if(parsedMessage.type === "chat") {
                // this will search for the current sending user's room I'd
                const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room;

                // If found then this loop will send the message to all users with same room I'd
                allSockets.forEach((s) => {
                    if(s.room == currentUserRoom) {
                        s.socket.send(JSON.stringify({
                            message: parsedMessage.payload.message,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                            sender: parsedMessage.payload.sender
                        }));
                    }
                })
            }

        });
    })
}