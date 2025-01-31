"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSignupSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    username: zod_1.default.string().min(3, "Username must be at least 3 characters").max(30, "Username must be less than 30 characters"),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters"),
    role: zod_1.default.string().optional(),
    profileImg: zod_1.default.string().optional(),
});
