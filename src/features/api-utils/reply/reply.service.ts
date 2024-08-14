import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { fcmDao } from "../../../models/api-util/fcm/fcm.dao";
import { fcmDto } from "../../../models/api-util/fcm/fcm.dto";
import { replyDao } from "../../../models/api-util/reply/reply.dao";
import {
  replyPostDto,
  replyPatchDto,
  replyDeleteDto,
} from "../../../models/api-util/reply/reply.dto";
import { pushCommentAlarm, pushReplyAlarm } from "../../../utils/fcm.utils";

export const replyService = {
  post: async (req: replyPostDto, user_id: string) => {
    const result = await replyDao.post(req, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };

    // 대댓글 보낸 후 게시글 작성자에게 fcm 전송
    let postData: fcmDto | null = null;
    if (req.type.toString() === "community") {
      postData = await fcmDao.getCommunityWriter(req.post_id.toString());
    } else if (req.type.toString() === "blog") {
      postData = await fcmDao.getBlogWriter(req.post_id.toString());
    } else if (req.type.toString() === "mvp") {
      postData = await fcmDao.getMVPWriter(req.post_id.toString());
    }

    if (postData && user_id !== postData.user_id) {
      pushCommentAlarm(postData, req.type);
    }

    // 대댓글 보낸 후 댓글 작성자에게 fcm 전송
    const commentData = await fcmDao.getCommentWriter(
      req.comment_id.toString()
    );
    // 댓글 작성자가 본인이거나 게시글 작성자랑 같은 사람이면 보내지 않음
    if (
      commentData &&
      postData &&
      commentData.user_id !== user_id &&
      commentData.user_id !== postData.user_id
    ) {
      pushReplyAlarm(commentData, req.type);
    }

    // 근데 게시글 작성자랑 댓글 작성자가 겹칠경우

    return body;
  },
  patch: async (req: replyPatchDto, user_id: string) => {
    const result = await replyDao.patch(req, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
  delete: async (req: replyDeleteDto, user_id: string) => {
    const result = await replyDao.delete(req, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
};
