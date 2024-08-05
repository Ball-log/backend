import { getPostDao } from "../../../models/myPage/post/post.dao";

import { getPostResDto } from "../../../models/myPage/post/post.dto";
import { status } from "../../../../config/response.status";
import { BaseApiResponse } from "../../../../config/response";

export const getPostService = async (userId: string, date: string) => {
    const result = await getPostDao(userId, date);

    const body: BaseApiResponse<getPostResDto> = {
        ...status.SUCCESS.body,
        result: {
            blog_list: result[0] as getPostResDto["blog_list"],
            mvp_list: result[1] as getPostResDto["mvp_list"]
        }

    };
    return body;
    console.log(date, result);

};
