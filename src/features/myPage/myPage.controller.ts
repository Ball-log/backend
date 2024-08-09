import { Request, Response } from "express";
import { getMyPageService } from "./myPage.service";

export const getMyPageController = async (req: Request, res: Response) => {
    const userId = res.locals.id;
    const result = await getMyPageService(userId);
    res.json(result);
};
