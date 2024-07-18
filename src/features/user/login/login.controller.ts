import { Request, Response } from "express";
import { postLoginService, getLoginService } from "./login.service";


export const postLoginController = async (req: Request, res: Response) => {
    const result = await postLoginService(req.body);
    console.log(req.headers);
    res.cookie("refreshToken", result[1], {
        httpOnly: true,
        secure: true, // HTTPS를 사용할 때만
        sameSite: "strict" // CSRF 방지
    });
    res.send(result[0]);
};

export const getLoginController = async (req: Request, res: Response) => {
    const result = await getLoginService(req.body);
    res.send(result);
};
