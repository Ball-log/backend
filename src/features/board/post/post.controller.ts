import { Request, Response } from "express";
import { postService } from "./post.service";

export const postController = {
  post: async (req: Request, res: Response) => {
    const user_id = res.locals.id;
    let result;
    if (req.body.post_type === "blog") {
      result = await postService.postBlog(req.body, user_id);
    } else {
      result = await postService.postMvp(req.body, user_id);
    }
    res.json(result);
  },

  get: async (req: Request, res: Response) => {
    const user_id = res.locals.id;
    const post_id = parseInt(req.params.post_id);
    const post_type = req.query.post_type;
    let result;

    if (post_type === "blog") {
      result = await postService.getBlog(post_id, user_id);
    } else if (post_type === "mvp") {
      result = await postService.getMvp(post_id, user_id);
    } else {
      return res.status(400).json({ error: "유효하지 않은 type입니다." });
    }
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
  },
};
