import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { post_likeDao } from "../../../models/board/post_like/post_like.dao";
import { post_likeDto } from "../../../models/board/post_like/post_like.dto";

export const post_likeService = {
    post: async (req: post_likeDto, user_id: string) => {
        const result = await post_likeDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    delete: async (req: post_likeDto, user_id: string) => {
        const result = await post_likeDao.delete(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
};