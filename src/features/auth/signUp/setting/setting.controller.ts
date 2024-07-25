import { Request, Response } from "express";
import { getSettingService } from "./setting.service";

export const getSettingController = async (req: Request, res: Response) => {

    const result = await getSettingService(res.locals.id);
    res.send(result);
};
