import { Request, Response } from "express";
import { getSettingService, patchSettingService } from "./setting.service";

export const getSettingController = async (req: Request, res: Response) => {

    const result = await getSettingService(res.locals.id);
    res.json(result);
};

export const patchSettingController = async (req: Request, res: Response) => {
    const result = await patchSettingService(res.locals.id, req.body);
    res.json(result);
};
