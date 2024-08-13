import { Request, Response } from "express";
import { replyService } from "./reply.service";
export const replyController =  {
    post: async (req: Request, res: Response) =>{
        const user_id = res.locals.id
        const result = await replyService.post(req.body, user_id)
        res.json(result)
    },
    patch: async (req:Request, res:Response) =>{
        const user_id = res.locals.id
        const result = await replyService.patch(req.body, user_id)
        res.json(result)
    },
    delete: async (req:Request, res:Response) =>{
        const user_id = res.locals.id
        const result = await replyService.delete(req.body, user_id)
        res.json(result)
    }
}