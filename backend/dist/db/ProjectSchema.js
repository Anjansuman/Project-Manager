"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    members: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "UserModel"
        }],
    // write logic for storing project files and folders in db so that user can access them
});
exports.ProjectModel = mongoose_1.default.model("Projects", ProjectSchema);
