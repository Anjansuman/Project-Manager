import { Router } from "express";


import { userMiddleware } from "../middleware/userMiddleware";
import { UserModel } from "../db/UserSchema";
import { ProjectModel } from "../db/ProjectSchema";
import { OrganizationModel } from "../db/OrganizationSchema";

import { AddProjectSchema } from "../zod/AddProjectSchema";
import mongoose from "mongoose";

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
            projects: projects.map(({ title, projectImg, completion }) => ({
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

        if (!parsedData.success) {
            res.status(400).json({ message: "Validation failed!" });
            return;
        }

        const { title, description, projectImg, deadline, completion, members, orgId } = parsedData.data;
        const creatorId = new mongoose.Types.ObjectId(req.userId);
        if (!creatorId) {
            res.status(400).json({ message: "Creator ID is missing!" });
            return;
        }

        let validMembers: mongoose.Types.ObjectId[] = [];

        if(members !== undefined) {
            // Fetch all users in the members array
            const foundMembers = await Promise.all(
                members.map(async (username: string) => {
                    return await UserModel.findOne({ username });
                })
            );

            // Filter out members that do not exist
            validMembers = foundMembers.filter(user => user !== null).map(user => user!._id);

            if (validMembers.length !== members?.length) {
                res.status(400).json({ message: "Some members do not exist!" });
                return;
            }
        }

        if (!validMembers.includes(creatorId)) {
            validMembers.push(creatorId);
        }

        // If project is inside an organization, ensure all members belong to the same org
        if (orgId) {
            const org = await OrganizationModel.findById(orgId);
            if (!org) {
                res.status(400).json({ message: "Organization not found!" });
                return;
            }

            const invalidMembers = validMembers.filter(memberId => !org.members.includes(memberId));
            if (invalidMembers.length > 0) {
                res.status(400).json({ message: "Some members are not part of the organization!" });
                return;
            }
        }

        // Create the project
        const newProject = await ProjectModel.create({
            title,
            description,
            projectImg,
            deadline,
            completion,
            members: validMembers, // Now includes all valid members
            orgId: orgId || null
        });

        if (!newProject) {
            res.status(400).json({ message: "Project creation failed!" });
            return;
        }

        // Send email notification to all members (implement SendGrid logic)
        // await sendProjectInviteEmails(validMembers, title, description);

        res.status(200).json({ message: "Project created successfully!" });
        return;

    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error });
        return;
    }
});


router.get('/new-project',userMiddleware, async (req, res) => {

})

export default router;