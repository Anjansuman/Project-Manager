
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userMiddleware } from "./middleware/userMiddleware";
import { UserModel } from "./db/UserSchema";
import { ProjectModel } from "./db/ProjectSchema";
import { OrganizationModel } from "./db/OrganizationSchema";

import { UserSignupSchema } from "./zod/UserSignupSchema";

import { MONGO_URL, SECRET_KEY } from "./config";
import { UserSigninSchema } from "./zod/UserSigninSchema";
import mongoose from "mongoose";
import { AddProjectSchema } from "./zod/AddProjectSchema";

const app = express();
app.use(express.json());

app.post("/eject/v1/signup", async (req, res) => {
    try {
        
        const parsedData = UserSignupSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }

        const { name, username, email, password, role, profileImg } = parsedData.data;

        const usernameTaken = await UserModel.findOne({
            username: username
        });
        
        if(usernameTaken) {
            res.status(400).json({
                message: "Username is already taken!"
            })
            return;
        }

        const emailTaken = await UserModel.findOne({
            email: email
        });
        
        if(emailTaken) {
            res.status(400).json({
                message: "Already Signed-up!"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = await UserModel.create({
            name,
            username,
            role,
            email,
            password: hashedPassword,
            profileImg
        });

        if(!newUser) {
            res.status(500).json({
                message: "User creation failed due internal server error"
            });
            return;
        }

        const token = "Bearer " + jwt.sign({
            userId: newUser._id
        }, SECRET_KEY);

        res.status(200).json({
            message: "User created successfully!",
            jwt: token
        })
        return;
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        });
        return;
    }
})

app.post("/eject/v1/signin",async (req, res) => {
    try {
        
        const parsedData = UserSigninSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }

        const { email, password } = parsedData.data;

        const user = await UserModel.findOne({
            email
        });

        if(!user) {
            res.status(404).json({
                message: "You are not signed-up"
            });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            res.status(401).json({
                message: "Invalid credentials!"
            });
            return;
        }

        const token = "Bearer " + jwt.sign({
            userId: user._id
        }, SECRET_KEY);

        res.status(200).json({
            message: "Signed-in successfully!",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
})

// this will show the dashboard
app.post("/eject/v1/dashboard", userMiddleware, async (req, res) => {
    try {

        const userId = req.userId;

        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "user not found!"
            });
            return;
        }

        const projects = await ProjectModel.find({
            members: user._id
        })

        res.status(200).json({
            name: user.name,
            username: user.username,
            role: user.role,
            profileImg: user.profileImg,
            projects: projects // make this more specific
        });
        return;

    } catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
});

// this will show the home page
app.get("/eject/v1/projects", userMiddleware, async (req, res) => {
    try {
        
        const userId = req.userId;

        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "user not found!"
            })
            return;
        }

        const projects = await ProjectModel.find({
            members: user._id
        })

        const org = await OrganizationModel.findOne({
            members: user._id
        })

        // check if org members is empty
        res.status(200).json({
            name: user.name,
            profileImg: user.profileImg,
            projects: projects,
            org: org?.members
        });
        return;

    } catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
});

app.put("/eject/v1/projects", userMiddleware, async (req, res) => {
    try {
        const parsedData = AddProjectSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }

        const { title, description, projectImg, deadline, leader, members } = parsedData.data;

        const newProject = await ProjectModel.create({
            title,
            description,
            projectImg,
            deadline,
            leader,
            members
        });

        if(!newProject) {
            res.status(400).json({
                message: "Project creation failed!"
            })
            return;
        }

        // write the logic to mail every member of the project, that you have been added to this project and send them title, and description

        res.status(200).json({
            message: "Project created successfully!"
        })
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!",
            error: error
        });
        return;
    }
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
