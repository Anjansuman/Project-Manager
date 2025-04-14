

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
            timestamp: Date,
            senderId: String
        }
    }
    | {
        type: WebSocketType.sketch,
        projectId: String,
        payload: Shape
    }


export enum WebSocketType {
    subscribe_channel = "subscribe_channel",
    unsubscribe_channel = "unsubscribe_channel",
    chat = "chat",
    sketch = "sketch",
    event = "event"
}

export enum Shapes {
    rect = "rect",
    circle = "circle",
    line = "line",
    pencil = "pencil"
}

export type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "pencil",
    points: {
        x: number,
        y: number
    }[]
} | {
    type: "line",
    x: number,
    y: number,
    pointX: number,
    pointY: number
};