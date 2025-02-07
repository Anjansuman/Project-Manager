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
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware_1 = require("../middleware/userMiddleware");
const NewOrgSchema_1 = require("../zod/NewOrgSchema");
const OrganizationSchema_1 = require("../db/OrganizationSchema");
const UserSchema_1 = require("../db/UserSchema");
const config_1 = require("../config");
const router = (0, express_1.Router)();
// this will create an organization
router.put("/createOrg", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = NewOrgSchema_1.NewOrgSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }
        const userId = req.userId;
        // check if user is already in an org or not
        const user = yield UserSchema_1.UserModel.findOne({
            _id: userId
        });
        if (!user) {
            res.status(404).json({
                message: "user not found, this error should not come."
            });
            return;
        }
        if (user.organization) {
            res.status(400).json({
                message: "You are already under an organization."
            });
            return;
        }
        // add the org into org model
        const { name, logo } = parsedData.data;
        const newOrg = yield OrganizationSchema_1.OrganizationModel.create({
            name,
            logo,
            projects: []
        });
        if (!newOrg) {
            res.status(400).json({
                message: "Organization creation failed!"
            });
        }
        // update the user model with new org
        const addOrgToUser = yield UserSchema_1.UserModel.updateOne({ _id: userId }, { $set: { organization: name } });
        // update the jwt with new orgId
        const token = jsonwebtoken_1.default.sign({
            userId: userId,
            orgId: newOrg._id
        }, config_1.SECRET_KEY);
        res.status(200).json({
            message: "Organization created successfully",
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
}));
// get members of an organization
router.get("/getOrgMembers", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orgName = req.orgId;
        const org = yield UserSchema_1.UserModel.find({
            organization: orgName
        });
        org.forEach(member => console.log(member.name));
        res.status(200).json({
            members: org
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
}));
exports.default = router;
