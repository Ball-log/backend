import { Request, Response } from "express";
import { PostLoginService, GetLoginService } from "./login.service";


export const PostLoginContoller = async (req: Request, res: Response) => {
    const result = await PostLoginService(req.body);
    res.send(result);
};

export const GetLoginContoller = async (req: Request, res: Response) => {
    const result = await GetLoginService(req.body);
    res.send(result);
};
