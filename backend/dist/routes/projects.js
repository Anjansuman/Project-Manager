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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userMiddleware_1 = require("../middleware/userMiddleware");
const UserSchema_1 = require("../db/UserSchema");
const ProjectSchema_1 = require("../db/ProjectSchema");
const OrganizationSchema_1 = require("../db/OrganizationSchema");
const AddProjectSchema_1 = require("../zod/AddProjectSchema");
const router = (0, express_1.Router)();
// this will show the projects
router.get("/", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// this is to add a project
router.put("/", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = AddProjectSchema_1.AddProjectSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }
        const { title, description, projectImg, deadline, leader, members } = parsedData.data;
        // this will search if the leader exists in users field
        const searchLeader = yield UserSchema_1.UserModel.findOne({});
        const newProject = yield ProjectSchema_1.ProjectModel.create({
            title,
            description,
            projectImg,
            deadline,
            leader,
            members
        });
        if (!newProject) {
            res.status(400).json({
                message: "Project creation failed!"
            });
            return;
        }
        // write the logic to mail every member of the project, that you have been added to this project and send them title, and description
        res.status(200).json({
            message: "Project created successfully!"
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        });
        return;
    }
}));
exports.default = router;
