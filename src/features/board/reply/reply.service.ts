import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { replyDao } from "../../../models/board/reply/reply.dao";
import { replyPostDto, replyPatchDto, replyDeleteDto } from "../../../models/board/reply/reply.dto";

export const replyService = {
    post: async (req: replyPostDto, user_id: string) => {
        const result = await replyDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    patch: async (req: replyPatchDto, user_id: string) => {
        const result = await replyDao.patch(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    delete: async (req: replyDeleteDto, user_id: string) => {
        const result = await replyDao.delete(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    }
};
