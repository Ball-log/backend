import { Request, Response } from "express";
import { postSignUpService } from "./signUp.service";

export const postSignUpController = async (req: Request, res: Response) => {
    const result = await postSignUpService(req.body);
    res.status(201).send(result);
};
