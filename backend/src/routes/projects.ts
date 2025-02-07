import { Router } from "express";


import { userMiddleware } from "../middleware/userMiddleware";
import { UserModel } from "../db/UserSchema";
import { ProjectModel } from "../db/ProjectSchema";
import { OrganizationModel } from "../db/OrganizationSchema";

import { AddProjectSchema } from "../zod/AddProjectSchema";

const router = Router();


// this will show the projects
router.get("/", userMiddleware, async (req, res) => {
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
            //return all the members of the org
        });
        return;

    } catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
});

// this is to add a project
router.put("/", userMiddleware, async (req, res) => {
    try {
        const parsedData = AddProjectSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }

        const { title, description, projectImg, deadline, leader, members } = parsedData.data;

        // this will search if the leader exists in users field
        const searchLeader = await UserModel.findOne({
            
        })

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
});

export default router;