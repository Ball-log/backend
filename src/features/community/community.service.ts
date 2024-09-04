import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import { postDao } from "../../models/board/post/post.dao";
import CommunityDao from "../../models/community/community.dao";
import {
    getPostDetailDto,
    getPostsResDto,
    patchCommunity,
    PostComments,
    PostReplies,
} from "../../models/community/community.dto";

const CommunityService = {
    getPosts: async (type: string, page: number, cursor?: number) => {
        const result = await CommunityDao.getPosts(type, page, cursor);

        if (result) {
            const body: BaseApiResponse<getPostsResDto> = {
                ...status.SUCCESS.body,
                result: {
                    totalCount: result.totalCount,
                    data: result.posts
                }
            };

            return body;
        } else {
            // TODO: 에러 발생 원인 찾아보기
            throw new ApiError(status.UNKNOWN_ERROR);
        }
    },

    getPostDetail: async (userId: string, postId: string) => {
        const postDetail = await CommunityDao.getPostDetail(postId);
        console.log(postDetail);
        if (postDetail == undefined) {
            throw new ApiError(status.WRONG_POST_ID);
        }
        const postComments = await CommunityDao.getPostComments(postId);
        const postReplies = await CommunityDao.getPostReplies(postId);
        const has_liked = await CommunityDao.getHasLiked(parseInt(postId), userId);
        console.log(has_liked)
        const comments: PostComments[] = postComments.map((row) => ({
            comment_id: row.comment_id,
            comment_user_id: row.author_id,
            comment_user_name: row.author_name,
            comment_user_icon_url: row.author_profile_url,
            comment_body: row.comment,
            comment_date: row.date,
            comment_isMine: row.author_id === userId,
        }));

        const replies: PostReplies[] = postReplies.map((row) => ({
            reply_id: row.reply_id,
            reply_user_id: row.author_id,
            reply_user_name: row.author_name,
            reply_user_icon_url: row.author_profile_url,
            reply_body: row.comment,
            reply_date: row.date,
            commented_id: row.comment_id,
            reply_isMine: row.author_id === userId
        }));

        const body: BaseApiResponse<getPostDetailDto> = {
            ...status.SUCCESS.body,
            result: {
                post_type: "community",
                post_id: postDetail.id,
                title: postDetail.title,
                content: postDetail.content,
                created_at: postDetail.created_at,
                updated_at: postDetail.updated_at,
                user_id: postDetail.author_id,
                user_name: postDetail.author_name,
                user_icon_url: postDetail.author_profile_url,
                isMine: userId == postDetail.author_id,
                like_count: postDetail.like_count,
                has_liked: Boolean(has_liked.ex),
                img_urls: JSON.parse(postDetail.img_urls).imgUrls,
                comment_count: postComments.length + postReplies.length,
                comment_list: comments,
                reply_list: replies
            }
        };

        return body;
    },
    insertPost: async (
        title: string,
        content: string,
        userId: string,
        img_urls: string[],
        type: string
    ) => {
        const postId = await CommunityDao.inserPost(title, content, userId, type);
        console.log(postId);
        if (title === "" || content === "") {
            throw new ApiError(status.THERE_IS_NO_TITLE_OR_CONTENT_IN_POST);
        }

        if (!title || !content || !img_urls || !type) {
            throw new ApiError(status.WRONG_BODY);
        }

        if (!(type === "team" || type === "league")) {
            throw new ApiError(status.TEAM_TYPE_ERROR);
        }
        
        if (postId) {
            const imgArr = { imgUrls: img_urls };
            const imgInfoArr = JSON.stringify(imgArr);
            await postDao.postImg(imgInfoArr, postId, "community");
            const response: BaseApiResponse<number> = {
                ...status.SUCCESS.body,
                result: postId
            };

            return response;
        } else {
            throw new ApiError(status.UNKNOWN_ERROR);
        }
    },
    deletePost: async (userId: string, post_id: number) => {
        const authorId = await CommunityDao.getPostAuthorId(post_id);

        if (userId !== authorId) {
            throw new ApiError(status.ONLY_AUTHOR_CAN_DELETE_OR_EDIT);
        }

        await CommunityDao.deletePost(post_id);
        const response: BaseApiResponse<null> = {
            ...status.SUCCESS.body,
            result: null
        };
        return response;
    },
    updatePost: async (user_id: string, post_id: number, req: patchCommunity) => {
        const authorId = await CommunityDao.getPostAuthorId(post_id);

        if (user_id !== authorId) {
            throw new ApiError(status.ONLY_AUTHOR_CAN_DELETE_OR_EDIT);
        }

        const result = await CommunityDao.updatePost(req.title, req.content, post_id);
        const imgArr = { imgUrls: req.img_urls };
        const imgInfoArr = JSON.stringify(imgArr);
        await postDao.patchImg(imgInfoArr, post_id);
        const body: BaseApiResponse<number> = {
            ...status.SUCCESS.body,
            result: result
        };
        return body;
    }
};

export default CommunityService;
