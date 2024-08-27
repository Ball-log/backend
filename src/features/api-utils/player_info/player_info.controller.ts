import { Request, Response } from "express";
import { player_infoService } from "./player_info.service";

export const player_infoController =  {
    get: async (req: Request, res: Response) =>{
        const match_id = parseInt(req.params.match_id)
        console.log(match_id);
        const result = await player_infoService.get(match_id)
        res.json(result)
    }
};