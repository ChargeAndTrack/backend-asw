import type { Request, RequestHandler, Response } from "express";
import { userModel } from "../models/user.ts";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";

const JWT_SECRET = config.jwtSecret;

export const login = async (req: Request, res: Response): Promise<Response> => {
    console.log("Login request: username " + req.body.username + " password " + req.body.password);
    try {
        const user = await userModel.findOne({
            "username": req.body.username,
            "password": req.body.password
        });
        if (!user) {
            return res.status(404).send("Login failed, user with these credentials not found");
        }
        console.log("Login successful, role: " + user.role);
        const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "3d" });
        return res.status(200).json({
            message: "Login successful",
            body: { token },
        });
    } catch (err) {
        console.log("Login failed " + err);
        return res.status(400).send("Login failed");
    }
};
