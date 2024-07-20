import { Request, Response } from "express";
import { getSignUpService } from "./signUp.service";
import { getSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";

export const getSignUpController = async (req: Request, res: Response) => {

    const result = await getSignUpService(res.locals as getSignUpLocalsDto);
    res.cookie("refreshToken", result[1], {
        httpOnly: true,
        secure: true, // HTTPS를 사용할 때만
        sameSite: "strict" // CSRF 방지
    });
    res.send(result[0]);
};


