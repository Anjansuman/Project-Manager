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
router.get("/solo-projects", userMiddleware, async (req, res) => {
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
            members: user._id,
            orgId: null
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
router.put("/:organization", userMiddleware, async (req, res) => {
    try {
        const parsedData = AddProjectSchema.safeParse(req.body);
        const orgName = req.params.organization;

        if (!parsedData.success) {
            res.status(400).json({ message: "Validation failed!" });
            return;
        }

        const { title, description, projectImg, deadline, completion, members } = parsedData.data;
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

        const org = await OrganizationModel.findOne({
            name: orgName
        });

        const orgId = org?._id;

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


router.get('/org-projects', userMiddleware, async (req, res) => {
    try {
        
        const userId = req.userId;
        const orgName = req.body.orgName;

        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "You're not signed-up"
            });
            return;
        }

        const org = await OrganizationModel.findOne({
            name: orgName
        })

        if(!org) {
            res.status(404).json({
                message: "Organization does not exist"
            })
            return;
        }

        const projects = await ProjectModel.find({
            members: userId,
            orgId: org._id
        });

        res.status(200).json({
            projects: projects.map(({ title, projectImg, completion }) => ({
                title: title,
                projectImg: projectImg,
                completion: completion || '0'
            }))
        })
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.get('/:organization', userMiddleware, async (req, res) => {
    try {
        
        const userId = req.userId;
        const orgName = req.params.organization;

        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "user not found!"
            })
            return;
        }

        if(orgName === 'my-secret-projects') {
            // personal projects
            const projects = await ProjectModel.find({
                members: user._id,
                orgId: null
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
        }

        const org = await OrganizationModel.findOne({
            name: orgName,
            members: userId
        });

        if(!org) {
            res.status(404).json({
                message: "Organization does not exist"
            })
            return;
        }

        // const orgProjects: {
        //     title: string,
        //     projectImg: string,
        //     completion: string
        // }[] = []

        const foundProjects = await Promise.all(
            org.projects.map(async (p) => {
                return await ProjectModel.findOne({
                    _id: p
                })
            })
        )

        const validProjects = foundProjects.filter((project) => project !== null);

        // orgProjects.push(validProjects);

        // const projects = await ProjectModel.find({
        //     members: userId,
        //     orgId: org._id
        // });

        res.status(200).json({
            projects: validProjects.map(({ title, projectImg, completion }) => ({
                title: title,
                projectImg: projectImg,
                completion: completion || '0'
            }))
        })
        return;


    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})

// this can create a project for both an individual or an organization
router.put('/:organization/new-project', userMiddleware, async (req, res) => {
    try {
        
        const userId = req.userId;
        const orgName = req.params.organization;
        const parsedData = AddProjectSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({ message: "Validation failed!" });
            return;
        }

        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "User not found!"
            });
            return;
        }

        const { title, description, projectImg, deadline, completion, members } = parsedData.data;

        // checks for individual project
        if(orgName === 'my-secret-projects') {
            
            const existingProject = await ProjectModel.findOne({
                title: title,
                members: userId
            });

            if(existingProject) {
                res.status(400).json({
                    message: "Project with this name already exists!"
                });
                return;
            }

            const newProject = await ProjectModel.create({
                title,
                description,
                projectImg,
                deadline,
                completion,
                createdBy: userId,
                members: userId, // members of individual project only includes the person who created it
                orgId: null
            });

            if(!newProject) {
                res.status(500).json({
                    message: "Project creation failed due to internal server error!"
                });
                return;
            }

            res.status(200).json({
                message: "Project created successfully!"
            });
            return;

        }

        // else for organizational projects
        const org = await OrganizationModel.findOne({
            name: orgName,
            members: userId
        });

        if(!org) {
            res.status(404).json({
                message: "Organization not found!"
            });
            return;
        }

        // check for same project name
        const existingProject = await OrganizationModel.findOne({
            title: title
        });
        
        if(existingProject) {
            res.status(400).json({
                message: "Project with this name already exists!"
            });
            return;
        }

        let validMembers: mongoose.Types.ObjectId[] = [];

        // if user has sent some members with this project creation
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

        // this will add the creator as a member also
        if (!validMembers.includes(new mongoose.Types.ObjectId(userId))) {
            validMembers.push(new mongoose.Types.ObjectId(userId));
        }

        // this will check if the members are present in the same org
        const invalidMembers = validMembers.filter(memberId => !org.members.includes(memberId));

        if (invalidMembers.length > 0) {
            res.status(400).json({ message: "Some members are not part of the organization!" });
            return;
        }

        // Create the project
        const newProject = await ProjectModel.create({
            title,
            description,
            projectImg,
            deadline,
            completion,
            members: validMembers, // Now includes all valid members
            orgId: org._id
        });

        if (!newProject) {
            res.status(400).json({ message: "Project creation failed!" });
            return;
        }

        const addProjectToOrg = await OrganizationModel.updateOne(
            { _id: org._id },
            { $push: { projects: newProject._id } }
        );

        if(!addProjectToOrg) {
            res.status(400).json({
                message: "addition of projects to the organization failed!"
            });
            return;
        }

        // Send email notification to all members (implement SendGrid logic)
        // await sendProjectInviteEmails(validMembers, title, description);

        res.status(200).json({ message: "Project created successfully!" });
        return;

        // as user will give input by username so find all the users from the organization members
        // then check for valid members and add the userId in the members and then create a new project

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})

export default router;