import { Request, Response } from "express";
import { getTeamSetService, patchTeamSetService } from "./teamSetting.service";

export const getTeamSetController = async (req: Request, res: Response) => {
    const result = await getTeamSetService();
    res.json(result);
};

export const patchTeamSetController = async (req: Request, res: Response) => {
    const result = await patchTeamSetService(res.locals.id, req.body);
    res.json(result);
};
