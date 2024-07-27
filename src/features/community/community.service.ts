import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import CommunityDao from "../../models/community/community.dao";
import {
  getPostDetailDto,
  getPostsResDto,
  PostComments,
  PostReplies,
  patchToggleLikeResDto,
} from "../../models/community/community.dto";

const CommunityService = {
  getPosts: async (type: string, page: number, cursor?: number) => {
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

  getPostDetail: async (userId: string, postId: string) => {
    const postDetail = await CommunityDao.getPostDetail(postId);
    if (postDetail == undefined) {
      throw new ApiError(status.WRONG_POST_ID);
    }

    const postComments = await CommunityDao.getPostComments(postId);
    const postReplies = await CommunityDao.getPostReplies(postId);

    const comments: PostComments[] = postComments.map((row) => ({
      commentId: row.comment_id,
      comment: row.comment,
      authorId: row.author_id,
      authorName: row.author_name,
      authorProfileUrl: row.author_profile_url,
      date: row.date,
      isMine: row.author_id === userId,
      replies: [],
    }));

    const replies: PostReplies[] = postReplies.map((row) => ({
      replyId: row.reply_id,
      commentId: row.comment_id,
      comment: row.comment,
      authorId: row.author_id,
      authorName: row.author_name,
      authorProfileUrl: row.author_profile_url,
      date: row.date,
      isMine: row.author_id === userId,
    }));

    // 댓글에 대댓글 삽입
    replies.forEach((reply) => {
      const comment = comments.find((c) => c.commentId === reply.commentId);
      if (comment) {
        comment.replies.push(reply);
      } else {
        // 만약 reply의 부모 comment가 존재 하지 않을 경우 무시
        console.log(
          `Comment ID ${reply.commentId} not found for reply ID ${reply.replyId}`
        );
      }
    });

    const body: BaseApiResponse<getPostDetailDto> = {
      ...status.SUCCESS.body,
      result: {
        title: postDetail.title,
        content: postDetail.cotent,
        authorId: postDetail.author_id,
        authorName: postDetail.author_name,
        authorProfileUrl: postDetail.author_profile_url,
        date: postDetail.date,
        likeCount: postDetail.like_count,
        commentCount: postComments.length + postReplies.length,
        imageUrl: postDetail.image_urls
          ? postDetail.image_urls.split(", ")
          : [],
        isMine: userId == postDetail.author_id,
        comments: comments,
      },
    };

    return body;
  },
  toggleLike: async (userId: string, postId: string) => {
    const currentState = await CommunityDao.getUserLikeStatus(userId, postId);
    console.log(currentState);
    if (currentState) {
      await CommunityDao.deleteLike(userId, postId);
      const bocy: BaseApiResponse<patchToggleLikeResDto> = {
        ...status.SUCCESS.body,
        result: {
          like: false,
        },
      };
      return bocy;
    } else {
      await CommunityDao.insertLike(userId, postId);
      const bocy: BaseApiResponse<patchToggleLikeResDto> = {
        ...status.SUCCESS.body,
        result: {
          like: true,
        },
      };
      return bocy;
    }
  },
};

export default CommunityService;
