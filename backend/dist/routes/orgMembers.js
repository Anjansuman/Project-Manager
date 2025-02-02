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
const router = (0, express_1.Router)();
router.get("/", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
