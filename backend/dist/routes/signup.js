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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSignupSchema_1 = require("../zod/UserSignupSchema");
const UserSchema_1 = require("../db/UserSchema");
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = UserSignupSchema_1.UserSignupSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }
        const { name, username, email, password, role } = parsedData.data;
        const usernameTaken = yield UserSchema_1.UserModel.findOne({
            username: username
        });
        if (usernameTaken) {
            res.status(400).json({
                message: "Username is already taken!"
            });
            return;
        }
        const emailTaken = yield UserSchema_1.UserModel.findOne({
            email: email
        });
        if (emailTaken) {
            res.status(400).json({
                message: "Already Signed-up!"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const newUser = yield UserSchema_1.UserModel.create({
            name,
            username,
            role,
            email,
            password: hashedPassword
        });
        if (!newUser) {
            res.status(500).json({
                message: "User creation failed due internal server error"
            });
            return;
        }
        const token = "Bearer " + jsonwebtoken_1.default.sign({
            userId: newUser._id,
            orgId: "not in any organization"
        }, config_1.SECRET_KEY);
        res.status(200).json({
            message: "User created successfully!",
            jwt: token
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
