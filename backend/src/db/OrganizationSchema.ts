import mongoose from "mongoose";

import { UserModel } from "./UserSchema";

// made this for the best case like if a user is present in to orgs then it will cause problems
// solve for that

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: UserModel,
    }]
})

export const OrganizationModel = mongoose.model("Organizations", OrganizationSchema);