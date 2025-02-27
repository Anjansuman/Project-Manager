import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { UserSigninSchema } from "../zod/UserSigninSchema";
import { UserModel } from "../db/UserSchema";
import { SECRET_KEY } from "../config";
import { OrganizationModel } from "../db/OrganizationSchema";

const router = Router();

router.post("/",async (req, res) => {
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
            userId: user._id,
        }, SECRET_KEY);

        res.status(200).json({
            message: "Signed-in successfully!",
            token: token,
            username: user.username
        });

    } catch (error) {
        res.status(500).json({
            error: error
        });
        return;
    }
})

export default router;