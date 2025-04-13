// /dashboard -> open -> websocket conenction 

// /project -> open -> data transmit - > project component -> mount -> websocket subscription message bheje
// /project -> close -> unmount -> data transmit - > project component -> mount -> websocket unsubscription message bheje

// Map

// Websocket , <string | null>

import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

import { WebSocketMessage, WebSocketType } from './WebSocketTypes';


export class WebSocketServerClass {

    private wss: WebSocketServer;
    private wsSubscriptions: Map<WebSocket, String | null>;
    private projectSubscribers: Map<String, Set<WebSocket>>;


    constructor(Server: Server) {
        this.wss = new WebSocketServer({
            server: Server
        });

        this.wsSubscriptions = new Map<WebSocket, String | null>();
        this.projectSubscribers = new Map<String, Set<WebSocket>>(); // this is to broadcast message faster
        this.init();
    }

    private init() {
        this.wss.on('connection', (socket) => {
            this.initializeTracking(socket);

            socket.on('message', (data: string) => {
                this.handleIncomingMessage(data, socket)
            });

            socket.on('close', () => {
                this.handleSocketClose(socket);
            });
        })
    }

    private initializeTracking(socket: WebSocket) {
        if (this.wsSubscriptions.has(socket)) return;

        // authorize the socket with it's JWT

        this.wsSubscriptions.set(socket, null);
    }

    private handleIncomingMessage(payload: string, socket: WebSocket) {
        const parsedMessage: WebSocketMessage = JSON.parse(payload);

        switch (parsedMessage.type) {

            case WebSocketType.subscribe_channel:
                return this.handleChannelSubscription(socket, parsedMessage);

            case WebSocketType.unsubscribe_channel:
                return this.handleChannelUnsubscription(socket, parsedMessage);

            case WebSocketType.chat:
                return this.handleChannelChats(parsedMessage);

            default:

        }
    }

    private handleChannelSubscription(socket: WebSocket, subscriptionMessage: WebSocketMessage) {

        this.wsSubscriptions.set(socket, subscriptionMessage.projectId);

        if (!this.projectSubscribers.has(subscriptionMessage.projectId)) {
            this.projectSubscribers.set(subscriptionMessage.projectId, new Set<WebSocket>());
        }

        this.projectSubscribers.get(subscriptionMessage.projectId)?.add(socket);

    }

    private handleChannelUnsubscription(socket: WebSocket, unsubscriptionMessage: WebSocketMessage) {
        this.wsSubscriptions.set(socket, null);

        if(this.projectSubscribers.has(unsubscriptionMessage.projectId)) {
            const sockets: Set<WebSocket> | undefined = this.projectSubscribers.get(unsubscriptionMessage.projectId);
            
            if(sockets === undefined) return;
        
            sockets.delete(socket);
        }

    }

    private handleChannelChats(chatMessage: WebSocketMessage) {

        if(chatMessage.type !== "chat") return;
        
        const message = JSON.stringify({
            type: "chat",
            payload: {
                message: chatMessage.payload.message,
                timeStamp: chatMessage.payload.message,
                senderId: chatMessage.payload.senderId
            }
        });

        // add redis and database in future

        this.wsSubscriptions.forEach((projectId, s) => {
            if(projectId === chatMessage.projectId) {
                s.send(message);
            }
        })
    }

    private handleSocketClose(socket: WebSocket) {
        this.wsSubscriptions.delete(socket);
    }

}