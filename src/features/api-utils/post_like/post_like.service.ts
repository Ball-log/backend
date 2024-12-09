import redisClient from "../../../../config/db.redis";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { alarmDao } from "../../../models/api-util/alarm/alarm.dao";
import { post_likeDao } from "../../../models/api-util/post_like/post_like.dao";
import { post_likeDto } from "../../../models/api-util/post_like/post_like.dto";
import { getSocketIO } from "../../../utils/socket.middleware";
import { fcmDao } from "../../../models/api-util/fcm/fcm.dao";
import { fcmDto } from "../../../models/api-util/fcm/fcm.dto";
import { pushLikeAlarm } from "../../../utils/fcm.utils";

export const post_likeService = {
    post: async (req: post_likeDto, user_id: string) => {
        const result = await post_likeDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };

        // 좋아요를 보낸 후 fcm 전송
        let postData: fcmDto | null = null;
        if (req.post_type.toString() === "community") {
            postData = await fcmDao.getCommunityWriter(req.post_id.toString());
        } else if (req.post_type.toString() === "blog") {
            postData = await fcmDao.getBlogWriter(req.post_id.toString());
        } else if (req.post_type.toString() === "mvp") {
            postData = await fcmDao.getMVPWriter(req.post_id.toString());
        }

        if (postData && !req.checked && user_id !== postData.user_id) {
            pushLikeAlarm(postData, req.post_type);
        }

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