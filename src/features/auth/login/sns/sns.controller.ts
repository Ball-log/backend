import { Request, Response } from "express";
import { loginGoogleService, loginKakaoService, loginNaverService } from "./sns.service";


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
