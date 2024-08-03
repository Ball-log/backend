import { Request, Response } from "express";
import { signUpGoogleService, signUpKakaoService, signUpNaverService } from "./sns.service";


export const signUpGoogleController = async (req: Request, res: Response) => {
    const result = await signUpGoogleService();
    res.redirect(result);
};

export const signUpKakaoController = async (req: Request, res: Response) => {
    const result = await signUpKakaoService();
    res.redirect(result);
};

export const signUpNaverController = async (req: Request, res: Response) => {
    const result = await signUpNaverService();
    res.redirect(result);
};
