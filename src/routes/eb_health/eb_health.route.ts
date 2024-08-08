import Router from "express";
import { Request, Response } from "express";
export const ebHealthRouter = Router();

export const healthController = (req: Request, res: Response) => {
    res.status(200).send("HELLO, I'm Healthy!");
};

ebHealthRouter.get("/", healthController);