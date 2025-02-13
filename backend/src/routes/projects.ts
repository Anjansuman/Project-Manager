import { Router } from "express";


import { userMiddleware } from "../middleware/userMiddleware";
import { UserModel } from "../db/UserSchema";
import { ProjectModel } from "../db/ProjectSchema";
import { OrganizationModel } from "../db/OrganizationSchema";

import { AddProjectSchema } from "../zod/AddProjectSchema";

const router = Router();

interface projectsData {
    title: string,
    projectImg: string,
    completion: string
}

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
            project: projects.map(({ title, projectImg, completion }) => ({
                title,
                projectImg,
                completion: completion || '0'
            }))
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

        const { title, description, projectImg, deadline, completion, leader, members } = parsedData.data;

        // this will search if the leader exists in users field
        const searchLeader = await UserModel.findOne({
            name: leader
        })

        if(!searchLeader) {
            console.log("leader not found");
            res.status(404).json({
                msg: "user doesn't exist!"
            })
            return;
        }

        // make this in a loop so that multiple can be found
        const searchMember = await UserModel.findOne({
            name: members[0]
        })

        console.log(leader);
        console.log(searchLeader._id)

        const newProject = await ProjectModel.create({
            title,
            description,
            projectImg,
            deadline,
            completion,
            leader: searchLeader?._id,
            members: searchMember?._id
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