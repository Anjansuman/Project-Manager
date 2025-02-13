import mongoose from "mongoose";


const ChatSchema: mongoose.Schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    receivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    messages: [{
        type: String,
        trim: true
    }]
})

export const ChatModel = mongoose.model("Chats", ChatSchema);