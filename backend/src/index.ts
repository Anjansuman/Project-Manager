
import express from "express";
import { createServer } from "http";


import { MONGO_URL } from "./config";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());


import signupRoute from "./routes/signup";
import signinRoute from "./routes/signin";
import dashboardRoute from "./routes/dashboard";
import projectsRoute from "./routes/projects";
import organization from "./routes/organization"
import { setupWebSocket } from "./WebSocket/chat";

app.use("/eject/v1/signup", signupRoute);
app.use("/eject/v1/signin", signinRoute);
app.use("/eject/v1/dashboard", dashboardRoute);
app.use("/eject/v1/projects", projectsRoute);
app.use("/ejectv1/Organization", organization);


// write this to get inner files to the frontend
app.get("/eject/v1/projects/:project_name", async (req, res) => {

})


// const wss = new WebSocketServer({ server });

setupWebSocket(server);

const PORT = 3000;
server.listen(PORT);

export async function connectDB(): Promise<void> {
    try {
        console.log("Connecting to database...");

        await mongoose.connect(MONGO_URL);

        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

connectDB();
