import type { Request, RequestHandler, Response } from "express";
import { userModel } from "../models/user.ts";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";

const JWT_SECRET = config.jwtSecret;

export const login: RequestHandler = (req: Request, res: Response) => {
    console.log("Login request: username " + req.body.username + " password " + req.body.password);
    userModel.findOne({ "username": req.body.username, "password": req.body.password })
        .then((user: any) => {
            console.log("Login successful, role: " + user.role);
            const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "3d", });
            res.status(200).json({
                message: "Login successful",
                body: { token },
            });
        })
        .catch((err: any) => {
            console.log("Login failed " + err);
            res.status(404).send("Login failed");
        });
};
