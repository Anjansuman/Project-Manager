"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema_1 = require("./UserSchema");
mongoose_1.default.connect("some url");
// made this for the best case like if a user is present in to orgs then it will cause problems
// solve for that
const OrganizationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
    },
    members: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: UserSchema_1.UserModel,
        }]
});
exports.OrganizationModel = mongoose_1.default.model("Organizations", OrganizationSchema);
