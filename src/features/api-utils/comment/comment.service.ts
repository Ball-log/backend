import redisClient from "../../../../config/db.redis";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { alarmDao } from "../../../models/api-util/alarm/alarm.dao";
import { commentDao } from "../../../models/api-util/comment/comment.dao";
import { commentPostDto, commentPatchDto, commentDeleteDto } from "../../../models/api-util/comment/comment.dto";
import { getSocketIO } from "../../../utils/socket.middleware";

export const commentService = {
    post: async (req: commentPostDto, user_id: string) => {
        
        const result = await commentDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        const message = `${req.post_type} 나의 글에 댓글이 달렸어요.`
        await alarmDao.post(req, message);
        const target: string | null = await redisClient.get(req.post_user_id + "_socket")
        if (target) {
            console.log("target", target);
            const io = getSocketIO();
            io.to(target).emit("ararm", message)
        }
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
        console.log("service req: ", req, " user_id: ", user_id);
        const result = await commentDao.delete(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    }
};
