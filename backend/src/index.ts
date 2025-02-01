
import express from "express";

import { MONGO_URL } from "./config";
import mongoose from "mongoose";

const app = express();
app.use(express.json());


import signupRoute from "./routes/signup";
import signinRoute from "./routes/signin";
import dashboardRoute from "./routes/dashboard";
import projectsRoute from "./routes/projects";

app.use("/eject/v1/signup", signupRoute);
app.use("/eject/v1/signin", signinRoute);
app.use("/eject/v1/dashboard", dashboardRoute);
app.use("/eject/v1/projects", projectsRoute);


// write this to get inner files to the frontend
app.get("/eject/v1/projects/:project_name", async (req, res) => {

})

app.listen(3000);

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
