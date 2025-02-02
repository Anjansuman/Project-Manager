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

    leader: {
        type: mongoose.Types.ObjectId,
        ref: UserModel
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: UserModel
    }],
    // write logic for storing project files and folders in db so that user can access them
});

export const ProjectModel = mongoose.model("Projects", ProjectSchema);