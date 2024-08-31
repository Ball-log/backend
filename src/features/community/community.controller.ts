import { Request, Response } from "express";
import CommunityService from "./community.service";
import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

const CommunityController = {
    getPostsController: async (req: Request, res: Response) => {
        const type = req.query.type as string;
        const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : undefined;
        const page = req.query.page ? parseInt(req.query.page as string) : 15;

        if (!type) {
            res.json(new ApiError(status.POST_TYPE_EMPTY).data.body);
            return;
        }
        const result = await CommunityService.getPosts(type, page, cursor);
        res.json(result);
    },

    getPostDetailController: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id;
            const postId = req.params.postId;
            const result = await CommunityService.getPostDetail(userId, postId);

            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },
    postPost: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id;
            const title = req.body.title;
            const content = req.body.content;
            const img_urls = req.body.img_urls;
            const type = req.body.type;

            const result = await CommunityService.insertPost(
                title,
                content,
                userId,
                img_urls,
                type
            );

            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },
    deletePost: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id;
            const post_id = parseInt(req.params.post_id)

            const result = await CommunityService.deletePost(userId, post_id);

            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },
    updatePost: async (req: Request, res: Response) => {
        const post_id = parseInt(req.params.post_id)
        try {
            const user_id = res.locals.id;
            const result = await CommunityService.updatePost(user_id, post_id, req.body)

            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    }
};

export default CommunityController;
