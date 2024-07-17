import { Request, Response } from "express";
import { postLoginService, getLoginService } from "./login.service";


export const postLoginContoller = async (req: Request, res: Response) => {
    const result = await postLoginService(req.body);
    res.send(result);
};

export const getLoginContoller = async (req: Request, res: Response) => {
    const result = await getLoginService(req.body);
    res.send(result);
};
