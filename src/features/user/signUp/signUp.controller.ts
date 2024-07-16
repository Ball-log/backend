import { Request, Response } from "express";
import { PostSignUpService } from "./signUp.service";

export const PostSignUpController = async (req: Request, res: Response) => {
    const result = await PostSignUpService(req.body);
    res.send(result);
};
