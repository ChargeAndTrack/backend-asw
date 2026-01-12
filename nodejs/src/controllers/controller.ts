import type { NextFunction, Request, RequestHandler, Response } from "express";
import { userModel } from "../models/user.ts";
import jwt from "jsonwebtoken";
import config from "../config/config.ts";

const JWT_SECRET = config.jwtSecret;

export const requireSignin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log("requireSignin");
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        try {
            const decodedToken: any = jwt.verify(token, JWT_SECRET);
            userModel.findOne({ _id: decodedToken._id })
                .then((user: any) => {
                    console.log("Valid, user:" + user);
                    req.body = { "username": user.username, "role": user.role };
                    next();
                })
                .catch((err: any) => {
                    console.log("Error: " + err);
                    res.status(404).json({ message: "User not found" });
                });
        } catch (err) {
            console.log("Token verification failed: " + err);
            res.status(401).json({ message: "Invalid token" });
        }
    } else {
        res.status(400).json({ message: "Authorization required" });
    }
};

export const login: RequestHandler = (req: Request, res: Response) => {
    console.log("Login request: username " + req.body.username + " password " + req.body.password);
    userModel.findOne({ "username": req.body.username, "password": req.body.password })
        .then((user: any) => {
            console.log("Login successful, role: " + user.role);
            console.log("JWT_SECRET: " + JWT_SECRET);
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

export const getHome: RequestHandler = (req: Request, res: Response) => {
    console.log("Get Home request");
    console.log("Username: " + req.body.username + " Role: " + req.body.role);
    userModel.find()
        .then((doc: any) => {
            res.json(doc)
        })
        .catch((err: any) => {
            res.send(err);
        });
};

export const postHome: RequestHandler = (req: Request, res: Response) => {};

export const getMap: RequestHandler = (req: Request, res: Response) => {};

export const postMap: RequestHandler = (req: Request, res: Response) => {};
