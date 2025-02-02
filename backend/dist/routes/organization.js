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
const router = (0, express_1.Router)();
router.put("/", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
}));
