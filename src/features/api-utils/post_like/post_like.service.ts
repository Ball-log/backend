import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { fcmDao } from "../../../models/api-util/fcm/fcm.dao";
import { fcmDto } from "../../../models/api-util/fcm/fcm.dto";
import { post_likeDao } from "../../../models/api-util/post_like/post_like.dao";
import { post_likeDto } from "../../../models/api-util/post_like/post_like.dto";
import { pushLikeAlarm } from "../../../utils/fcm.utils";

export const post_likeService = {
  post: async (req: post_likeDto, user_id: string) => {
    const result = await post_likeDao.post(req, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };

    // 좋아요를 보낸 후 fcm 전송
    let postData: fcmDto | null = null;
    if (req.type.toString() === "community") {
      postData = await fcmDao.getCommunityWriter(req.post_id.toString());
    } else if (req.type.toString() === "blog") {
      postData = await fcmDao.getBlogWriter(req.post_id.toString());
    } else if (req.type.toString() === "mvp") {
      postData = await fcmDao.getMVPWriter(req.post_id.toString());
    }

    if (postData && !req.checked && user_id !== postData.user_id) {
      pushLikeAlarm(postData, req.type);
    }

    return body;
  },
  delete: async (req: post_likeDto, user_id: string) => {
    const result = await post_likeDao.delete(req, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
};
