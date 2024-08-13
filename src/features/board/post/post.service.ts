import { AppConfig } from "aws-sdk";
import { ApiError } from "../../../../config/error";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { postDao } from "../../../models/board/post/post.dao";
import {
  mvpDto,
  blogDto,
  getBlogDto,
  CommentList,
  ReplyList,
  matchDto,
  getBlogDto_,
} from "../../../models/board/post/post.dto";

export const postService = {
  getBlog: async (post_id: number, user_id: string) => {
    try {
      const result = await postDao.getBlog(post_id, user_id);

      if (!result) {
        throw new ApiError(status.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new ApiError(status.DATA_NOT_FOUND);
    }
  },

  getMvp: async (post_id: number, user_id: string) => {
    try {
      const result = await postDao.getMvp(post_id, user_id);

      if (!result) {
        throw new ApiError(status.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new ApiError(status.DATA_NOT_FOUND);
    }
  },

  // getType: async (post_id: number, user_id: string) => {
  //     const type = await postDao.getType(post_id);
  //     let result;
  //     if (type === "blog") {
  //         result = await postDao.getBlog(post_id, user_id);
  //         console.log(result);
  //     } else {
  //         result = await postDao.getMvp(post_id, user_id);
  //         console.log(result);
  //     }
  //     const res0 = result[0] as getBlogDto_;
  //     const res1 = result[1] as { img_url: string };
  //     const res2 = result[2] as CommentList;
  //     const res3 = result[3] as ReplyList;
  //     const res4 = result[4] as { like_count: number };
  //     const res5 = result[5] as { ex: number };
  //     const match_id = res0.match_id;
  //     const matchInfo = await postDao.getMatch(match_id) as matchDto;
  //     const imgUrl = JSON.parse(res1.img_url);
  //     const body: BaseApiResponse<getBlogDto> = {
  //         ...status.SUCCESS.body,
  //         result: {
  //             post_type: "blog",
  //             ...res0,
  //             img_urls: imgUrl.img_urls as string[],
  //             match_info: matchInfo,
  //             comment_list: [
  //                 ...res2
  //             ],
  //             reply_list: [
  //                 ...res3
  //             ],
  //             like_count: res4.like_count,
  //             has_liked: Boolean(res5.ex)
  //         }
  //     };
  //     return body;
  // },
  postBlog: async (req: blogDto, user_id: string) => {
    const result = await postDao.postBlog(req, user_id);
    const imgArr = { imgUrls: req.imgUrls };
    const imgInfoArr = JSON.stringify(imgArr);
    await postDao.postImg(imgInfoArr, result, req.post_type);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
  postMvp: async (req: mvpDto, user_id: string) => {
    const result = await postDao.postMvp(req, user_id);
    const imgArr = { imgUrls: req.imgUrls };
    const imgInfoArr = JSON.stringify(imgArr);
    await postDao.postImg(imgInfoArr, result, req.post_type);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
  patchBlog: async (req: blogDto, post_id: number, user_id: string) => {
    const result = await postDao.patchBlog(req, post_id, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
  patchMvp: async (req: mvpDto, post_id: number, user_id: string) => {
    const result = await postDao.patchMvp(req, post_id, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
  deleteBlog: async (post_id: number, user_id: string) => {
    console.log(post_id, user_id);
    const result = await postDao.deleteBlog(post_id, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
  deleteMvp: async (post_id: number, user_id: string) => {
    const result = await postDao.deleteMvp(post_id, user_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result,
    };
    return body;
  },
};
