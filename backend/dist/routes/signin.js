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
const UserSigninSchema_1 = require("../zod/UserSigninSchema");
const UserSchema_1 = require("../db/UserSchema");
const config_1 = require("../config");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = UserSigninSchema_1.UserSigninSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }
        const { email, password } = parsedData.data;
        const user = yield UserSchema_1.UserModel.findOne({
            email
        });
        if (!user) {
            res.status(404).json({
                message: "You are not signed-up"
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: "Invalid credentials!"
            });
            return;
        }
        const token = "Bearer " + jsonwebtoken_1.default.sign({
            userId: user._id
        }, config_1.SECRET_KEY);
        res.status(200).json({
            message: "Signed-in successfully!",
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
}));
exports.default = router;
