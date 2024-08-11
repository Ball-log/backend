import { Request, Response } from "express";
import { postService } from "./post.service";

export const postController =  {
    post: async (req: Request, res: Response) => {
        console.log(req.body)
        const user_id = res.locals.id;
        let result;
        if (req.body.type === "blog") {
            result = await postService.postBlog(req.body, user_id);
        } else {
            result = await postService.postMvp(req.body, user_id);
        }
        res.json(result);
    },

    get: async (req: Request, res: Response) => {
        const user_id = res.locals.id;
        const post_id = parseInt(req.params.post_id);
        const result = await postService.getType(post_id, user_id);
        res.json(result);
    },
    patch: async (req: Request, res: Response) => {
        const post_id = parseInt(req.params.post_id);
        const user_id = res.locals.id;
        let result;
        if (req.body.type === "blog") {
            result = await postService.patchBlog(req.body, post_id, user_id);
        } else {
            result = await postService.patchMvp(req.body, post_id, user_id);
        }
        res.json(result);
    },
    delete: async (req: Request, res: Response) => {
        const post_id = parseInt(req.params.post_id);
        const user_id = res.locals.id;
        let result;
        if (req.body.type === "blog") {
            result = await postService.deleteBlog(post_id, user_id);
        } else {
            result = await postService.deleteMvp(post_id, user_id);
        }
        res.json(result);
    }
};
