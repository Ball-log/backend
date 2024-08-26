import { Request, Response } from "express";
import { getLoginService } from "./login.service";


export const getLoginController = async (req: Request, res: Response) => {
    const result = await getLoginService(res.locals.id);
    res.setHeader("AccessToken", result[0]); // 액세스 토큰을 헤더에 설정
    res.setHeader("RefreshToken", result[1]); // 리프레시 토큰을 헤더에 설정
    res.setHeader("user_id", res.locals.id); //
    res.send("Tokens sent in headers");
};
