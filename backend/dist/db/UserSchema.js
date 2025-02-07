"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: "Imvalid email format"
        }
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "OrganizationModel",
    }
});
exports.UserModel = mongoose_1.default.model("Users", UserSchema);
