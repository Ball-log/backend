import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";
import { postDao } from "../../../models/board/post/post.dao";
import { mvpDto, blogDto } from "../../../models/board/post/post.dto";

export const postService = {
    postBlog: async (req: blogDto, user_id: string) => {
        const result = await postDao.postBlog(req, user_id);
        const imgArr = { imgUrls: req.imgUrls };
        const imgInfoArr = JSON.stringify(imgArr)
        await postDao.postImg(imgInfoArr, result, req.type);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    postMvp: async (req: mvpDto, user_id: string) => {
        const result = await postDao.postMvp(req, user_id);
        const imgArr = { imgUrls: req.imgUrls };
        const imgInfoArr = JSON.stringify(imgArr)
        await postDao.postImg(imgInfoArr, result, req.type);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    patchBlog: async (req: blogDto, post_id: number, user_id: string) => {
        const result = await postDao.patchBlog(req, post_id, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    patchMvp: async (req: mvpDto, post_id: number, user_id: string) => {
        const result = await postDao.patchMvp(req, post_id, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    deleteBlog: async (post_id: number, user_id: string) => {
        console.log(post_id, user_id);
        const result = await postDao.deleteBlog(post_id, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    },
    deleteMvp: async (post_id: number, user_id: string) => {
        const result = await postDao.deleteMvp(post_id, user_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    }
};
