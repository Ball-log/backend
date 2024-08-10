import { Request, Response } from "express";
import { getSignUpService } from "./signUp.service";
import { getSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";

export const getSignUpController = async (req: Request, res: Response) => {

    const result = await getSignUpService(res.locals as getSignUpLocalsDto);
    res.set("Authorization", `Bearer ${result[0]}`);
    res.set("RefreshToken", result[1]);
    res.send("ok");
};


