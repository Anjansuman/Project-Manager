"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userMiddleware_1 = require("./middleware/userMiddleware");
const UserSchema_1 = require("./db/UserSchema");
const ProjectSchema_1 = require("./db/ProjectSchema");
const OrganizationSchema_1 = require("./db/OrganizationSchema");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/eject/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
}));
app.post("/eject/v1/signin", (req, res) => {
    try {
    }
    catch (error) {
    }
});
// this will show the dashboard
app.post("/eject/v1/dashboard", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield UserSchema_1.UserModel.findOne({
            _id: userId
        });
        if (!user) {
            res.status(404).json({
                message: "user not found!"
            });
            return;
        }
        const projects = yield ProjectSchema_1.ProjectModel.find({
            members: user._id
        });
        res.status(200).json({
            name: user.name,
            username: user.username,
            role: user.role,
            profileImg: user.profileImg,
            projects: projects // make this more specific
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
}));
// this will show the home page
app.get("/eject/v1/home", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield UserSchema_1.UserModel.findOne({
            _id: userId
        });
        if (!user) {
            res.status(404).json({
                message: "user not found!"
            });
            return;
        }
        const projects = yield ProjectSchema_1.ProjectModel.find({
            members: user._id
        });
        const org = yield OrganizationSchema_1.OrganizationModel.findOne({
            members: user._id
        });
        // check if org members is empty
        res.status(200).json({
            name: user.name,
            profileImg: user.profileImg,
            projects: projects,
            org: org === null || org === void 0 ? void 0 : org.members
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
}));
