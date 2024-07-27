import { Request, Response } from "express";
import { patchBackImgService } from "./backgroundImg.service";

export const patchBackImgController = async (req: Request, res: Response) => {
    const result = await patchBackImgService(res.locals.id, req.body);
    res.json(result);
};
