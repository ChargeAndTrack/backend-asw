import type { Request, RequestHandler, Response } from "express";
import { userModel } from "../models/user.ts";

export const login: RequestHandler = (req: Request, res: Response) => {};

export const getHome: RequestHandler = (req: Request, res: Response) => {
    console.log("Get Home request: " + req)
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
