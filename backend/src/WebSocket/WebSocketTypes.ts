

export type WebSocketMessage = 
    | {
        type: WebSocketType.subscribe_channel | WebSocketType.unsubscribe_channel,
        projectId: String
    }
    | {
        type: WebSocketType.chat,
        projectId: String,
        payload: {
            message: String,
            timeStamp: Date,
            senderId: String
        }
    }


export enum WebSocketType {
    subscribe_channel = "subscribe_channel",
    unsubscribe_channel = "unsubscribe_channel",
    chat = "chat",
    event = "event"
}