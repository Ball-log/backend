import { getPostDao } from "../../../models/myPage/post/post.dao";
import { getPostResDto } from "../../../models/myPage/post/post.dto";
import { status } from "../../../../config/response.status";
import { BaseApiResponse } from "../../../../config/response";
import moment from "moment-timezone";

export const getPostService = async (userId: string, date: string) => {
    const result = await getPostDao(userId, date);
    result[0].map((blog) => blog.blog_created_at = moment.utc(blog.blog_created_at).tz("Asia/Seoul")
        .format("YYYY-MM-DD HH:mm:ss"));
    result[1].map((mvp) => mvp.mvp_created_at = moment.utc(mvp.mvp_created_at).tz("Asia/Seoul")
        .format("YYYY-MM-DD HH:mm:ss"));
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
