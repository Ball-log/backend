import { Request, Response } from "express";
import { matchInfoService } from "./matchInfo.service";

export const matchInfoController =  {
    get: async (req: Request, res: Response) =>{
        const date = req.query.date as string;
        const result = await matchInfoService.get(date)
        res.json(result)
    }
};