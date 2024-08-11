import { Request, Response } from "express";
import { post_likeService } from "./post_like.service";

export const post_likeController =  {
    post: async (req: Request, res: Response) => {
        const user_id = res.locals.id;
        let result;
        if (req.body.checked === true) {
            result = await post_likeService.delete(req.body, user_id);
        } else {
            result = await post_likeService.post(req.body, user_id);
        }
        res.json(result);
    }
}