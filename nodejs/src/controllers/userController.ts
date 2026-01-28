import type { NextFunction, Request, Response } from "express";
import { userModel, Roles } from "../models/user.ts";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";
import type { Types } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: Types.ObjectId;
                username: string;
                role: string;
            };
        }
    }
}

const JWT_SECRET = config.jwtSecret;

export const verifyLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        try {
            const decodedToken: any = jwt.verify(token, JWT_SECRET);
            const user = await userModel.findOne({ _id: decodedToken._id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            console.log("Found user:" + user);
            req.user = { id: user._id, username: user.username, role: user.role };
            return next();
        } catch (err) {
            console.log("Token verification failed: " + err);
            return res.status(401).json({ message: "Invalid token" });
        }
    }
    return res.status(400).json({ message: "Authorization required" });
};

export const verifyAdminRole = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    if (req.user.role !== Roles.Admin) {
        return res.status(403).json({ message: "User " + req.user.username + " is not admin" });
    }
    return next();
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    console.log("getUser");
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.sendStatus(500);
    }
};
