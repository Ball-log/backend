import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import CommunityDao from "../../models/community/community.dao";
import { getPostsResDto } from "../../models/community/community.dto";

const CommunityService = {
  getPosts: async (
    type: string,
    page: number,
    cursor?: number
  ) => {
    const result = await CommunityDao.getPosts(type, page, cursor);

    if (result) {
      const body: BaseApiResponse<getPostsResDto> = {
        ...status.SUCCESS.body,
        result: {
          totalCount: result.totalCount,
          data: result.posts,
        },
      };

      return body;
    } else {
      // TODO: 에러 발생 원인 찾아보기
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },
};

export default CommunityService;
