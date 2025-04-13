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
    // private eventSubscriptions: Map<WebSocket, Set<String>>;
    private projectSubscribers: Map<String, Set<WebSocket>>;
    private wsSubscriptions: Map<WebSocket, String | null>;


    constructor(Server: Server) {
        this.wss = new WebSocketServer({
            server: Server
        });

        // this.eventSubscriptions = new Map<WebSocket, Set<String>>();

        // remember in this map complete socket is removed.
        this.projectSubscribers = new Map<String, Set<WebSocket>>(); // this is to broadcast message faster
        this.wsSubscriptions = new Map<WebSocket, String | null>();
        this.init();
    }

    private init() {
        try {
            this.wss.on('connection', (socket) => {
                this.initializeTracking(socket);
    
                socket.on('message', (data: string) => {
                    this.handleIncomingMessage(data, socket)
                });
    
                socket.on('close', () => {
                    this.handleSocketClose(socket);
                });
            })
        } catch (error) {
            this.handleError(error);
        }
    }

    private initializeTracking(socket: WebSocket) {
        try {
            if(this.wsSubscriptions.has(socket)) return;

            // authorize the socket with it's JWT
    
            this.wsSubscriptions.set(socket, null);
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleIncomingMessage(payload: string, socket: WebSocket) {
        try {
            const parsedMessage: WebSocketMessage = JSON.parse(payload);

            switch (parsedMessage.type) {
    
                case WebSocketType.subscribe_channel:
                    return this.handleChannelSubscription(socket, parsedMessage);
    
                case WebSocketType.unsubscribe_channel:
                    return this.handleChannelUnsubscription(socket, parsedMessage);
    
                case WebSocketType.chat:
                    return this.handleChannelChats(socket, parsedMessage);
    
                default:
    
            }
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleChannelSubscription(socket: WebSocket, subscriptionMessage: WebSocketMessage) {
        try {

            const currentProjectId = this.wsSubscriptions.get(socket);
            const projectId = subscriptionMessage.projectId;
    
            // discard if the user is sending same projectId from which he is connected
            if(currentProjectId === projectId) return;

            // deleting the socket from the past project
            if(currentProjectId !== null && currentProjectId !== undefined) {
                this.projectSubscribers.get(currentProjectId)?.delete(socket);
            }
    
            // adding the socket to new project
            if(projectId !== null) {
                if(!this.projectSubscribers.has(projectId)) {
                    this.projectSubscribers.set(projectId, new Set<WebSocket>());
                }
                this.projectSubscribers.get(projectId)?.add(socket); // this denotes that a project has how many sockets
                this.wsSubscriptions.set(socket, projectId); // this denotes that a user is connected to which project
            }

        } catch (error) {
            this.handleError(error);
        }
    }

    private handleChannelUnsubscription(socket: WebSocket, unsubscriptionMessage: WebSocketMessage) {
        try {
            
            const currentProjectId = this.wsSubscriptions.get(socket);
            const projectId = unsubscriptionMessage.projectId;

            // return if both the projectIds are not equal
            if(currentProjectId !== projectId) return;

            if(projectId !== null) {
                this.projectSubscribers.get(projectId)?.delete(socket);
                this.wsSubscriptions.set(socket, null);
            }

        } catch (error) {
            this.handleError(error);
        }
    }

    private handleChannelChats(socket: WebSocket, chatMessage: WebSocketMessage) {
        try {

            if(!this.projectSubscribers.has(chatMessage.projectId)) return;
            
            const message = this.chatStringify(chatMessage);

            // see chatStringify
            if(!message) return;
    
            const sockets: Set<WebSocket> | undefined = this.projectSubscribers.get(chatMessage.projectId);
    
            if(!sockets) return;
    
            sockets.forEach((member) => {
                // only send if WebSocket is open to that user
                if(member.readyState === WebSocket.OPEN && member !== socket) {
                    member.send(message);
                }
            });
    
            // add redis and database in future

        } catch (error) {
            this.handleError(error);
        }
    }

    private handleSocketClose(socket: WebSocket) {
        try {
            
            const currentProjectId = this.wsSubscriptions.get(socket);

            if(currentProjectId !== undefined && currentProjectId !== null) {
                const projectSocket = this.projectSubscribers.get(currentProjectId);
                projectSocket?.delete(socket);

                // clean the empty set
                if(projectSocket?.size === 0) {
                    this.projectSubscribers.delete(currentProjectId);
                }
            }

            this.wsSubscriptions.delete(socket);

        } catch (error) {
            this.handleError(error);
        }
    }

    private chatStringify(chatMessage: WebSocketMessage): string | undefined {
        try {
            
            // return if the message is not of type chat
            if(chatMessage.type !== "chat") return;

            const message = JSON.stringify({
                type: "chat",
                projectId: chatMessage.projectId,
                payload: {
                    message: chatMessage.payload.message,
                    timeStamp: chatMessage.payload.timeStamp,
                    senderId: chatMessage.payload.senderId
                }
            });

            return message;

        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: unknown) {
        console.error("WebSocket Error: ", error);
    }

}