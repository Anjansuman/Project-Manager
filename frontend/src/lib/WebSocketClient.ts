import { WebSocketMessage, WebSocketType } from "./WebSocketTypes";


export class WebSocketClient {

    private ws: WebSocket | null = null;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;

    constructor(private URL: string) {
        this.connect();
    }

    private connect() {
        try {
            
            this.ws = new WebSocket(this.URL);

            this.ws.onopen = () => {
                this.reconnectAttempts = 0;
            };

            this.ws.onclose = () => {
                //socket closed
                this.handleReconnect();
            };

            this.ws.onerror = (error) => {
                console.error("WebSocket error: ", error);
            };

            this.ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    this.handleMessage(message);
                } catch (error) {
                    
                }
            }

        } catch (error) {
            
        }
    }

    private handleReconnect() {

    }

    private handleMessage(message: WebSocketMessage) {

        switch(message.type) {

            case WebSocketType.subscribe_channel:
                return this.handleSubscription(message);

            case WebSocketType.unsubscribe_channel:
                return this.handleUnsubscription(message);

            case WebSocketType.chat:
                return this.handleChat(message);

            case WebSocketType.sketch:
                return this.handleSketch(message);

            default:
                return;

        }

    }
    
    private handleSubscription(message: WebSocketMessage) {
        const sendingMessage = JSON.stringify({
            type: "subscribe_channel",
            projectId: message.projectId
        });

        this.ws?.send(sendingMessage);
    }

    private handleUnsubscription(message: WebSocketMessage) {
        const sendingMessage = JSON.stringify({
            type: "unsubscribe_channel",
            projectId: message.projectId
        });

        this.ws?.send(sendingMessage);
    }

    private handleChat(message: WebSocketMessage) {

    }

    private handleSketch(message: WebSocketMessage) {

    }

    private sendMessage(message: WebSocketMessage) {
        this.ws?.
    }

}