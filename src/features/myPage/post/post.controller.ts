import { Request, Response } from "express";
import { getPostService } from "./post.service";

export const getPostController = async (req: Request, res: Response) => {
    const userId = res.locals.id;
    const date =  req.query.date as string;
    const result = await getPostService(userId, date);
    res.json(result);
};
