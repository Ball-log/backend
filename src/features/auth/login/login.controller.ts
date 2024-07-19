import { Request, Response } from "express";
import { getLoginService } from "./login.service";


export const getLoginController = async (req: Request, res: Response) => {
    const result = await getLoginService(res.locals.id);
    res.cookie("refreshToken", result[1], {
        httpOnly: true,
        secure: true, // HTTPS를 사용할 때만
        sameSite: "strict" // CSRF 방지
    });
    console.log(res.cookie("refreshToken", result));
    res.send(result[0]);
};

