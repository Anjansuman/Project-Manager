import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    userId?: string;
}

export function userMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return res.status(422).json({
            msg: "You are not authorized!"
        });
    }

    const token = authorization.split(" ")[1];

    if(!process.env.SECRET_KEY) {
        return res.status(500).json({
            msg: "internal server error!"
        });
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

        if(!verifiedToken.username) {
            return res.status(401).json({
                msg: "Invalid token!"
            });
        }

        req.userId = verifiedToken.username;
        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token!"
        });
    }


}