import mongoose from "mongoose";

import { userModel } from "./UserSchema";

mongoose.connect("some url");

const ProjectSchema = new mongoose.Schema({
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
        ref: userModel
    },

    members: [{
        type: mongoose.Types.ObjectId,
        ref: userModel
    }],
    // write logic for storing project files and folders in db so that user can access them
});

export const projectModel = new mongoose.Model("Projects", ProjectSchema);