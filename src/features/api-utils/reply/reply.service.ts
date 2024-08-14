import redisClient from "../../../../config/db.redis";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { alarmDao } from "../../../models/api-util/alarm/alarm.dao";
import { replyDao } from "../../../models/api-util/reply/reply.dao";
import { replyPostDto, replyPatchDto, replyDeleteDto } from "../../../models/api-util/reply/reply.dto";
import { getSocketIO } from "../../../utils/socket.middleware";

export const replyService = {
    post: async (req: replyPostDto, user_id: string) => {
        const result = await replyDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        const message = `${req.post_type} 나의 댓글에 답글이 달렸어요.`
        await alarmDao.post(req, message);
        const target: string | null = await redisClient.get(req.post_user_id + "_socket")
        if (target) {
            console.log(target);
            const io = getSocketIO();
            io.to(target).emit("ararm", message)
        }
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
