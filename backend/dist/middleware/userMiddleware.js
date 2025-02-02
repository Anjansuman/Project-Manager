"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userMiddleware = (req, res, next) => {
    const authorization = req.headers["authorization"];
    if (!authorization || !authorization.startsWith("Bearer ")) {
        res.status(400).json({
            msg: "You are not authorized!"
        });
        return;
    }
    const token = authorization.split(" ")[1];
    if (!config_1.SECRET_KEY) {
        res.status(500).json({
            msg: "internal server error!"
        });
        return;
    }
    try {
        const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
        if (!verifiedToken || !verifiedToken.userId) {
            res.status(401).json({
                msg: "Invalid token!"
            });
            return;
        }
        req.userId = verifiedToken.userId;
        req.orgId = verifiedToken.orgId;
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: "Invalid or expired token!"
        });
        return;
    }
};
exports.userMiddleware = userMiddleware;
