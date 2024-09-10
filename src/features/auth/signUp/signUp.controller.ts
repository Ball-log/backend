import { Request, Response } from "express";
import { getSignUpService } from "./signUp.service";
import { getSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";

export const getSignUpController = async (req: Request, res: Response) => {

    const result = await getSignUpService(res.locals as getSignUpLocalsDto);
    res.setHeader("Authorization", "Bearer " + result[0]); // 액세스 토큰을 헤더에 설정
    res.setHeader("RefreshToken", result[1]); // 리프레시 토큰을 헤더에 설정
    res.setHeader("user_id", res.locals.id); //
    res.send("Tokens sent in headers");
};


