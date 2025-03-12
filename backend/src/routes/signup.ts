import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserSignupSchema } from "../zod/UserSignupSchema";
import { UserModel } from "../db/UserSchema";
import { SECRET_KEY } from "../config";
import { OrganizationModel } from "../db/OrganizationSchema";
import { generateOTP } from "../utils/generateOTP";
import { SendEmail } from "../node-mailer/SendEmail";


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
            password: hashedPassword,
            profileImg: '',
        });
        
        if(!newUser) {
            res.status(500).json({
                message: "User creation failed due internal server error"
            });
            return;
        }

        if(!SECRET_KEY) {
            res.status(500).json({
                message: "Internal server error!"
            });
            return;
        }

        const token = "Bearer " + jwt.sign({
            userId: newUser._id,
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
});


// this will store the OTP, optimize it in future using redis
const otpStore = new Map<string, {otp: string; expiresAt: number}>();

// for verification of email address
// this will work only after clicking send OTP and then
router.post("/send-OTP", async (req, res) => {
    try {
        const email = req.body.email;

        if(!email) {
            res.status(400).json({
                message: "Provide an email!"
            });
            return;
        }

        // generate the OTP
        const OTP = generateOTP(6);
        console.log("OTP: ", OTP);

        // store OTP with expiry of 5 mins
        otpStore.set(email, { otp: OTP, expiresAt: Date.now() + 5 * 60 * 1000 });

        const subject: string = "Your eject OTP Verification Code";
        const text = `Your OTP is ${OTP}`;

        const sentEmail = await SendEmail(email, subject, text);

        if(!sentEmail) {
            res.status(500).json({
                message: "Failed to send email due to an internal server error!"
            });
            return;
        }

        res.status(200).json({
            message: "Sent the OTP"
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
});


// this is for verifying OTP
router.post("/verify-OTP", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            res.status(400).json({
                message: "Provide email and OTP!"
            });
            return;
        }

        const storedOTP = otpStore.get(email);

        if(!storedOTP) {
            res.status(404).json({
                message: "Failed to fetch OTP, try sending the OTP again!"
            });
            return;
        }

        // check if the OTP is expired!
        if(storedOTP.expiresAt > Date.now()) {
            res.status(400).json({
                message: "OTP expired!"
            });
            return;
        }

        if(storedOTP.otp !== otp) {
            res.status(400).json({
                message: "Invalid OTP!"
            });
            return;
        }

        otpStore.delete(email);

        // send a thanks giving joining mail

        res.status(200).json({
            message: "OTP verified!"
        });


    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        });
        return;
    }
})

export default router;