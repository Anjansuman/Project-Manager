"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProjectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AddProjectSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().optional(),
    projectImg: zod_1.default.string().optional(),
    deadline: zod_1.default.date().optional(),
    leader: zod_1.default.string(),
    members: zod_1.default.array(zod_1.default.string())
});
