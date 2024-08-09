import Router from "express";
import { Request, Response } from "express";
export const healthRouter = Router();

export const healthController = (req: Request, res: Response) => {
    res.status(200).send("HELLO, I'm Healthy!");
};

healthRouter.get("/", healthController);
