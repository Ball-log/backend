import { Request, Response } from "express";
import { getSignUpService } from "./signUp.service";
import { getSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";

export const getSignUpController = async (req: Request, res: Response) => {

    const result = await getSignUpService(res.locals as getSignUpLocalsDto);
    res.cookie("accessToken", "Bearer " + result[0], {
        httpOnly: true, // JavaScript로 쿠키 접근 불가
        secure: true,   // HTTPS에서만 전송
        sameSite: "strict" // 동일 출처 요청에서만 쿠키 전송
    });

    res.cookie("refreshToken", result[1], {
        httpOnly: true,
        secure: true, // HTTPS를 사용할 때만
        sameSite: "strict" // CSRF 방지
    });
    res.send("ok");
};


