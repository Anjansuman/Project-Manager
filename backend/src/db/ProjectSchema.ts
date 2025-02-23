import mongoose from "mongoose";

import { UserModel } from "./UserSchema";


const ProjectSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // check for uniqueness for only in a personal project page not in all db
    },

    description: {
        type: String,
    },

    projectImg: {
        type: String,
    },

    deadline: {
        type: Date,
    },

    // this will have the percentage of completion.
    completion: {
        type: String
    },

    chats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats"
    },

    // leader: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Users"
    // },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    orgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizations"
    }
    // write logic for storing project files and folders in db so that user can access them
});

export const ProjectModel = mongoose.model("Projects", ProjectSchema);