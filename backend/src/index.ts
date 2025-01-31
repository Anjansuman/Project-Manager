
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userMiddleware } from "./middleware/userMiddleware";
import { UserModel } from "./db/UserSchema";
import { ProjectModel } from "./db/ProjectSchema";
import { OrganizationModel } from "./db/OrganizationSchema";

import { UserSignupSchema } from "./zod/UserSignupSchema";

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

        res.status(200).json({
            message: "User created successfully!"
        })
        return;
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})

app.post("/eject/v1/signin", (req, res) => {
    try {
        
    } catch (error) {
        
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
app.get("/eject/v1/home", userMiddleware, async (req, res) => {
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
})
