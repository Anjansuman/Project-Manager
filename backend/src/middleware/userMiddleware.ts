import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

import { SECRET_KEY } from "../config";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];

    if(!authorization || !authorization.startsWith("Bearer ")) {
        res.status(400).json({
            msg: "You are not authorized!"
        });
        return;
    }

    const token = authorization.split(" ")[1];

    if(!SECRET_KEY) {
        res.status(500).json({
            msg: "internal server error!"
        });
        return;
    }

    try {
        const verifiedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if(!verifiedToken || !verifiedToken.userId) {
            res.status(401).json({
                msg: "Invalid token!"
            });
            return;
        }

        req.userId = verifiedToken.userId;
        next();

    } catch (error) {
        res.status(401).json({
            msg: "Invalid or expired token!"
        });
        return;
    }


}