import express from "express";
import { userMiddleware } from "./middleware/userMiddleware";
import { userModel } from "./db/UserSchema";
import { projectModel } from "./db/ProjectSchema";

const app = express();
app.use(express.json());

app.post("/eject/v1/signup", (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

app.post("/eject/v1/signin", (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

app.post("/eject/v1/dashboard", userMiddleware, async (req, res) => {
    try {

        const username = req.username;

        const user = await userModel.findOne({
            username: username
        });

        if(!user) {
            return res.status(404).json({
                message: "user not found!"
            });
        }

        const projects = await projectModel.findOne({
            members: user.name
        })

        return res.status(200).json({
            name: user.name,
            username: user.username,
            profileImg: user.profileImg,
            projects: projects // make this more specific
        })

    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
});

app.get("/eject/v1/home", userMiddleware, async (req, res) => {
    try {
        


    } catch (error) {
        
    }
})
