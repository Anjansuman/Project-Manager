import { Router } from "express";
import jwt from "jsonwebtoken";

import { userMiddleware } from "../middleware/userMiddleware";
import { NewOrgSchema } from "../zod/NewOrgSchema";
import { OrganizationModel } from "../db/OrganizationSchema";
import { UserModel } from "../db/UserSchema";
import { SECRET_KEY } from "../config";

const router = Router();

// this will create an organization
router.put("/createOrg", userMiddleware, async (req, res) => {
    try {
        
        const parsedData = NewOrgSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }

        const userId = req.userId;

        // check if user is already in an org or not
        const user = await UserModel.findOne({
            _id: userId
        });

        if(!user) {
            res.status(404).json({
                message: "user not found, this error should not come."
            })
            return;
        }

        // if(user.organization) {
        //     res.status(400).json({
        //         message: "You are already under an organization."
        //     });
        //     return;
        // }

        // add the org into org model
        const { name, logo } = parsedData.data;

        const newOrg = await OrganizationModel.create({
            name,
            logo,
            projects: []
        });

        if(!newOrg) {
            res.status(400).json({
                message: "Organization creation failed!"
            })
        }

        // update the user model with new org
        const addOrgToUser = await UserModel.updateOne(
            { _id: userId },
            { $set: { organization: name } }
        )

        // update the jwt with new orgId
        const token = jwt.sign({
            userId: userId,
            orgId: newOrg._id
        }, SECRET_KEY);

        res.status(200).json({
            message: "Organization created successfully",
            token: token
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});

// get members of an organization
router.get("/getOrgMembers", userMiddleware, async (req, res) => {
    try {
        const orgName = req.orgId;

        const org = await UserModel.find({
            organization: orgName
        })

        org.forEach(member => console.log(member.name))

        res.status(200).json({
            members: org
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});

export default router;