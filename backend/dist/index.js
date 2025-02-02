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
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const signup_1 = __importDefault(require("./routes/signup"));
const signin_1 = __importDefault(require("./routes/signin"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const projects_1 = __importDefault(require("./routes/projects"));
const orgMembers_1 = __importDefault(require("./routes/orgMembers"));
app.use("/eject/v1/signup", signup_1.default);
app.use("/eject/v1/signin", signin_1.default);
app.use("/eject/v1/dashboard", dashboard_1.default);
app.use("/eject/v1/projects", projects_1.default);
app.use("/ejectv1/getOrgmembers", orgMembers_1.default);
// write this to get inner files to the frontend
app.get("/eject/v1/projects/:project_name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
