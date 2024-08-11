import { Request, Response } from "express";
import { commentService } from "./comment.service";
export const commentController =  {
    post: async (req: Request, res: Response) =>{
        const user_id = res.locals.id;
        const result = await commentService.post(req.body, user_id);
        res.json(result);
    },
    patch: async (req: Request, res: Response) =>{
        const user_id = res.locals.id;
        const result = await commentService.patch(req.body, user_id);
        res.json(result);
    },
    delete: async (req: Request, res: Response) =>{
        const user_id = res.locals.id;
        const result = await commentService.delete(req.body, user_id);
        res.json(result);
    }
}