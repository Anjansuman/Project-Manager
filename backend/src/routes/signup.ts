import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserSignupSchema } from "../zod/UserSignupSchema";
import { UserModel } from "../db/UserSchema";
import { SECRET_KEY } from "../config";
import { OrganizationModel } from "../db/OrganizationSchema";


const router = Router();

router.post("/", async (req, res) => {
    try {
        
        const parsedData = UserSignupSchema.safeParse(req.body);

        if(!parsedData.success) {
            res.status(400).json({
                message: "Validation failed!"
            });
            return;
        }

        const { name, username, email, password, role } = parsedData.data;

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
            password: hashedPassword
        });


        if(!newUser) {
            res.status(500).json({
                message: "User creation failed due internal server error"
            });
            return;
        }

        const token = "Bearer " + jwt.sign({
            userId: newUser._id,
            orgId: "not in any organization"
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

export default router;