import { Request, Response } from "express"
import { alarmService } from "./alarm.service"

export const alarmController = {
    get: async (req: Request, res: Response) => {
        const user_id = res.locals.id;
        const result = await alarmService.get(user_id);
        res.json(result);
    },
    delete: async (req: Request, res: Response) => {
        const user_id = res.locals.id;
        const result = await alarmService.delete(req.body, user_id);
        res.json(result);
    }
}