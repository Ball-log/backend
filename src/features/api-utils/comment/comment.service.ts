import redisClient from "../../../../config/db.redis";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { alarmDao } from "../../../models/api-util/alarm/alarm.dao";
import { commentDao } from "../../../models/api-util/comment/comment.dao";
import { commentPostDto, commentPatchDto, commentDeleteDto } from "../../../models/api-util/comment/comment.dto";
import { getSocketIO } from "../../../utils/socket.middleware";
import { fcmDao } from "../../../models/api-util/fcm/fcm.dao";
import { fcmDto } from "../../../models/api-util/fcm/fcm.dto";
import { pushCommentAlarm } from "../../../utils/fcm.utils";

export const commentService = {
    post: async (req: commentPostDto, user_id: string) => {
        
        const result = await commentDao.post(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };

         // 댓글을 보낸 후 fcm 전송
        let postData: fcmDto | null = null;
        if (req.post_type.toString() === "community") {
            postData = await fcmDao.getCommunityWriter(req.post_id.toString());
        } else if (req.post_type.toString() === "blog") {
            postData = await fcmDao.getBlogWriter(req.post_id.toString());
        } else if (req.post_type.toString() === "mvp") {
            postData = await fcmDao.getMVPWriter(req.post_id.toString());
        }

        if (postData && user_id !== postData.user_id) {
            pushCommentAlarm(postData, req.post_type);
        }

        const message = `${req.post_type} 나의 글에 댓글이 달렸어요.`
        await alarmDao.post(req, message);
        const target: string | null = await redisClient.get(req.post_user_id + "_socket")
        if (target) {
            console.log(target);
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
        const result = await commentDao.delete(req, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    }
};
