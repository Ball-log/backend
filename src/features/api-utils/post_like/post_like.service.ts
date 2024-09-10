import redisClient from "../../../../config/db.redis";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { alarmDao } from "../../../models/api-util/alarm/alarm.dao";
import { post_likeDao } from "../../../models/api-util/post_like/post_like.dao";
import { post_likeDto } from "../../../models/api-util/post_like/post_like.dto";
import { getSocketIO } from "../../../utils/socket.middleware";

export const post_likeService = {
    post: async (req: post_likeDto, user_id: string) => {
        const result = await post_likeDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        const message = `${req.post_type} 게시물에 좋아요 반응이 달렸어요.`
        await alarmDao.post(req, message);
        const target: string | null = await redisClient.get(req.post_user_id + "_socket")
        if (target) {
            console.log(target);
            const io = getSocketIO();
            io.to(target).emit("ararm", message)
        }
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