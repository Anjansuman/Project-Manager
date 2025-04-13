
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";


import { MONGO_URL } from "./config";
import { setupWebSocket } from "./WebSocket/chat";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());


import signupRoute from "./routes/signup";
import signinRoute from "./routes/signin";
import dashboardRoute from "./routes/dashboard";
import projectsRoute from "./routes/projects";
import organization from "./routes/organization"
import { WebSocketServerClass } from "./WebSocket/WebSocketClass";
// import WebSocketServerClass from "./WebSocket/claude";

app.use("/eject/v1/signup", signupRoute);
app.use("/eject/v1/signin", signinRoute);
app.use("/eject/v1/dashboard", dashboardRoute);
app.use("/eject/v1/projects", projectsRoute);
app.use("/eject/v1/organization", organization);


// write this to get inner files to the frontend
app.get("/eject/v1/projects/:project_name", async (req, res) => {

})

// setupWebSocket(server);
new WebSocketServerClass(server);
// new WebSocketServerClass(server);

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server started on: ", PORT);
});

export async function connectDB(): Promise<void> {
    try {
        console.log("Connecting to database...");

        if(!MONGO_URL) {
            console.log("Cannot find Database URL!");
            process.exit(1);
        }

        await mongoose.connect(`${MONGO_URL}`);

        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

connectDB();
