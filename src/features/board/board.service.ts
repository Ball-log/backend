import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import BoardDao from "../../models/board/board.dao";
import { emptyDto } from "../../models/empty.dto";
import { MatchInfoDto } from "../../models/board/board.dto";
import { isAwaitKeyword } from "typescript";
import { integer } from "aws-sdk/clients/cloudfront";

const BoardService = {
  insertPost: async (
    title: string,
    body: string,
    //publicStatus: boolean,
    thumbnailUrl: string,
    matchInfo: MatchInfoDto | null,
    userId: string,
    type: string,
    playerId?: number,
    playerRecord?: string
  ) => {
    if (!title || !body) {
      throw new ApiError(status.THERE_IS_NO_TITLE_OR_CONTENT_IN_POST);
    }
    if (!type || (type !== "blog" && type !== "mvp")) {
      throw new ApiError(status.WRONG_BODY);
    }

    let postId: number;

    //type(blog, mvp)에 따라서
    if (type === "mvp") {
      if (!playerId || !playerRecord) {
        console.log("2");
        throw new ApiError(status.WRONG_BODY);
      }
      postId = await BoardDao.insertMvp(
        title,
        playerId,
        playerRecord,
        //publicStatus,
        thumbnailUrl,
        userId
      );
    } else {
      postId = await BoardDao.insertPost(
        title,
        body,
        //publicStatus,
        thumbnailUrl,
        userId
      );
    }

    if (matchInfo) {
      await BoardDao.insertMatchInfo(matchInfo, postId);
    }

    const response: BaseApiResponse<emptyDto> = {
      ...status.SUCCESS.body,
      result: {},
    };

    return response;
  },

  getPostDetails: async (postId: string) => {
    const post = await BoardDao.getPost(postId);

    const comments = await BoardDao.getComments(postId);
    const likeCount = await BoardDao.getLikeCount(postId);

    const response = {
      ...status.SUCCESS.body,
      result: {
        post,
        comments,
        likeCount,
      },
    };
    return response;
  },

  // //게시글 수정
  // updatePost: async (
  //   postId: string,
  //   title: string,
  //   body: string,
  //   publicStatus: boolean,
  //   thumbnailUrl: string,
  //   matchInfo: string,
  //   userId: string,
  //   type: string,
  //   playerId?: string,
  //   playerRecord?: string
  // ) => {
  //   if (!title || !body) {
  //     throw new ApiError(status.THERE_IS_NO_TITLE_OR_CONTENT_IN_POST);
  //   }
  //   if (!type || (type !== "blog" && type !== "mvp")) {
  //     throw new ApiError(status.WRONG_BODY);
  //   }

  //   //type(blog | mvp)에 따라
  //   if (type === "mvp") {
  //     if (!playerId || !playerRecord) {
  //       throw new ApiError(status.WRONG_BODY);
  //     }
  //     await BoardDao.updateMvp(
  //       postId,
  //       title,
  //       playerId,
  //       playerRecord,
  //       publicStatus,
  //       thumbnailUrl,
  //       userId
  //     );
  //   } else {
  //     await BoardDao.updatePost(
  //       postId,
  //       title,
  //       body,
  //       publicStatus,
  //       thumbnailUrl,
  //       userId
  //     );
  //   }

  //   if (matchInfo) {
  //     await BoardDao.updateMatchInfo(matchInfo, postId);
  //   }

  //   const response: BaseApiResponse<emptyDto> = {
  //     ...status.SUCCESS.body,
  //     result: {},
  //   };

  //   return response;
  // },

  //게시글 삭제
  deletePost: async (postId: string, userId: string) => {
    const postAuthorId = await BoardDao.getPostAuthorId(postId);
    if (postAuthorId !== userId) {
      throw new ApiError(status.UNAUTHORIZED);
    }

    const deleted = await BoardDao.deletePost(postId);
    if (deleted) {
      return { message: "게시글이 삭제되었습니다." };
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  //댓글 추가
  addComment: async (
    postId: string,
    userId: string,
    body: string,
    postType: "blog" | "mvp"
  ) => {
    if (!body) {
      throw new ApiError(status.THERE_IS_NO_CONTENT_IN_COMMENT);
    }

    const commentId = await BoardDao.insertComment(
      postId,
      userId,
      body,
      postType
    );

    if (commentId) {
      const response: BaseApiResponse<emptyDto> = {
        ...status.SUCCESS.body,
        result: {},
      };
      return response;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  //대댓글 추가
  addReply: async (
    postId: string,
    userId: string,
    commentId: string,
    body: string,
    postType: "blog" | "mvp"
  ) => {
    if (!body) {
      throw new ApiError(status.WRONG_BODY);
    }

    const replyId = await BoardDao.insertReply(
      postId,
      userId,
      commentId,
      body,
      postType
    );

    if (replyId) {
      const response: BaseApiResponse<emptyDto> = {
        ...status.SUCCESS.body,
        result: {},
      };
      return response;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  getComments: async (postId: string) => {
    const comments = await BoardDao.getComments(postId);
    return comments;
  },

  //댓글 수정
  updateComment: async (commentId: string, content: string, userId: string) => {
    const comment = await BoardDao.getCommentById(commentId);
    if (!comment || comment.userId !== userId) {
      throw new ApiError(status.UNAUTHORIZED);
    }

    await BoardDao.updateComment(commentId, content);
  },

  //댓글 삭제
  deleteComment: async (commentId: string, userId: string) => {
    const comment = await BoardDao.getCommentById(commentId);
    if (!comment || comment.userId !== userId) {
      throw new ApiError(status.UNAUTHORIZED);
    }

    const deleted = await BoardDao.deleteComment(commentId);
    if (!deleted) {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
  },

  toggleLike: async (
    userId: string,
    postId: string,
    postType: "blog" | "mvp"
  ) => {
    const hasLiked = await BoardDao.checkUserLike(userId, postId);

    if (hasLiked) {
      //이미 좋아요를 누른 경우 취소
      await BoardDao.removeLike(userId, postId);
    } else {
      // 좋아요를 누르지 않았다면 좋아요 추가
      await BoardDao.addLike(userId, postId, postType);
    }

    //현재 좋아요 수 반환
    const likeCount = await BoardDao.getLikeCount(postId);
    return { likeCount };
  },
};

export default BoardService;
