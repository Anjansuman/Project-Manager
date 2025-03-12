import { Router } from "express";

import { userMiddleware } from "../middleware/userMiddleware";
import { UserModel } from "../db/UserSchema";
import { ProjectModel } from "../db/ProjectSchema";


const router = Router();


// this will show the dashboard
router.get("/", userMiddleware, async(req, res) => {
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

        console.log(projects);

        res.status(200).json({
            name: user.name,
            username: user.username,
            role: user.role,
            image: user.profileImg,
            projects: projects.map(({ title, projectImg, completion }) => ({
                title,
                projectImg,
                completion: completion || '0'
            }))
            // make this more specific
        });
        return;

    } catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
});

router.get("/profile", userMiddleware, async(req, res) => {
    try {
        
        const userId = req.userId;

        if(!userId) {
            res.status(404).json({
                message: "You are not authorized!"
            });
            return;
        }

        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "User doesn't exist!"
            });
            return;
        }

        // now user is found
        res.status(200).json({
            name: user.name,
            profileImg: user.profileImg,
            username: user.username,
            role: user.role
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})


export default router;