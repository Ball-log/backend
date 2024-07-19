import { Request, Response } from "express";
import { getSignUpService } from "./signUp.service";
import { postSignUpLocalsDto } from "../../../models/auth/signUp/signUp.dto";

export const getSignUpController = async (req: Request, res: Response) => {

    const result = await getSignUpService(res.locals as postSignUpLocalsDto);
    res.status(201).send(result);
};


