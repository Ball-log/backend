import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { commentDao } from "../../../models/board/comment/comment.dao";
import { commentPostDto, commentPatchDto, commentDeleteDto } from "../../../models/board/comment/comment.dto";

export const commentService = {
    post: async (req: commentPostDto, user_id: string) => {
        const result = await commentDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    patch: async (req: commentPatchDto, user_id: string) => {
        const result = await commentDao.patch(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    delete: async (req: commentDeleteDto, user_id: string) => {
        const result = await commentDao.delete(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    }
};
