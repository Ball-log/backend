import { Request, Response } from "express";
import { loginGoogleService, loginKakaoService, loginNaverService } from "./sns.service";
import { getLoginController } from "../login.controller";


export const loginGoogleController = async (req: Request, res: Response) => {
    const result = await loginGoogleService();
    res.redirect(result);
};

export const loginKakaoController = async (req: Request, res: Response) => {
    const result = await loginKakaoService();
    res.redirect(result);
};

export const loginNaverController = async (req: Request, res: Response) => {
    const result = await loginNaverService();
    res.redirect(result);
};

export const loginTestController = async (req: Request, res: Response) => {
    res.locals.id = req.body.id;
    const result = await getLoginController(req, res);
    res.json(result);
};