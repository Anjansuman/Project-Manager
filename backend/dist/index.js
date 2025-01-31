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
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMiddleware_1 = require("./middleware/userMiddleware");
const UserSchema_1 = require("./db/UserSchema");
const ProjectSchema_1 = require("./db/ProjectSchema");
const OrganizationSchema_1 = require("./db/OrganizationSchema");
const UserSignupSchema_1 = require("./zod/UserSignupSchema");
const config_1 = require("./config");
const UserSigninSchema_1 = require("./zod/UserSigninSchema");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/eject/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = UserSignupSchema_1.UserSignupSchema.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }
        const { name, username, email, password, role, profileImg } = parsedData.data;
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
            password: hashedPassword,
            profileImg
        });
        if (!newUser) {
            res.status(500).json({
                message: "User creation failed due internal server error"
            });
            return;
        }
        const token = "Bearer " + jsonwebtoken_1.default.sign({
            userId: newUser._id
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
app.post("/eject/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.listen(3000);
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Connecting to database...");
            yield mongoose_1.default.connect(config_1.MONGO_URL);
            console.log("Database Connected Successfully!");
        }
        catch (error) {
            console.error("Database connection failed:", error);
            process.exit(1);
        }
    });
}
connectDB();
