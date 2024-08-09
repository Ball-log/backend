import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import BoardDao from "../../models/board/board.dao";
import { emptyDto } from "../../models/empty.dto";
import boardRouter from "../../routes/board/board.routes";

const BoardService = {
  insertPost: async (
    title: string,
    matchResult: string,
    content: string,
    imageUrls: [string],
    userId: string,
    type: string,
    playerImage?: string //선수 사진은 mvp, blog인지에 따라 선택적으로 작성
  ) => {
    if (!title || !content) {
      throw new ApiError(status.THERE_IS_NO_TITLE_OR_CONTENT_IN_POST);
    }
    if (!type || (type !== "blog" && type !== "mvp")) {
      throw new ApiError(status.WRONG_BODY);
    }

    let postId: number;

    //type(blog, mvp)에 따라서
    if (type === "mvp") {
      if (!playerImage || !matchResult) {
        throw new ApiError(status.WRONG_BODY);
      }
      postId = await BoardDao.insertMvp(
        title,
        playerImage,
        matchResult,
        content,
        userId
      );
    } else {
      postId = await BoardDao.insertPost(
        title,
        matchResult,
        content,
        userId,
        type
      );
    }

    if (postId) {
      const imageInsertPromises = imageUrls.map((url) => {
        return BoardDao.insertImageIntoPost(url, postId.toString());
      });
      await Promise.all(imageInsertPromises);

      const response: BaseApiResponse<emptyDto> = {
        ...status.SUCCESS.body,
        result: {},
      };

      return response;
    } else {
      throw new ApiError(status.UNKNOWN_ERROR);
    }
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

  addComment: async (
    postId: string,
    userId: string,
    content: string,
    parentId?: string
  ) => {
    if (!content) {
      throw new ApiError(status.THERE_IS_NO_CONTENT_IN_COMMENT);
    }

    const commentId = await BoardDao.insertComment(
      postId,
      userId,
      content,
      parentId
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

  getComments: async (postId: string) => {
    const comments = await BoardDao.getComments(postId);
    return comments;
  },

  //게시글 수정
  updatePost: async (
    postId: string,
    title: string,
    matchResult: string,
    content: string,
    imageUrls: string[],
    userId: string,
    type: string,
    playerImage?: string
  ) => {
    if (!title || !content) {
      throw new ApiError(status.THERE_IS_NO_TITLE_OR_CONTENT_IN_POST);
    }
    if (!type || (type !== "blog" && type !== "mvp")) {
      throw new ApiError(status.WRONG_BODY);
    }

    //type(blog | mvp) 구분
    if (type === "mvp") {
      if (!playerImage || !matchResult) {
        throw new ApiError(status.WRONG_BODY);
      }
      await BoardDao.updateMvp(
        postId,
        title,
        playerImage,
        matchResult,
        content,
        userId
      );
    } else {
      await BoardDao.updatePost(
        postId,
        title,
        matchResult,
        content,
        userId,
        type
      );
    }

    // 이미지 업데이트
    await BoardDao.deleteImagesFromPost(postId);
    const imageInsertPromises = imageUrls.map((url) => {
      return BoardDao.insertImageIntoPost(url, postId);
    });
    await Promise.all(imageInsertPromises);

    const response: BaseApiResponse<emptyDto> = {
      ...status.SUCCESS.body,
      result: {},
    };

    return response;
  },

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

  toggleLike: async (userId: string, postId: string) => {
    const hasLiked = await BoardDao.checkUserLike(userId, postId);

    if (hasLiked) {
      //이미 좋아요를 누른 경우 취소
      await BoardDao.removeLike(userId, postId);
    } else {
      // 좋아요를 누르지 않았다면 좋아요 추가
      await BoardDao.addLike(userId, postId);
    }

    //현재 좋아요 수 반환
    const likeCount = await BoardDao.getLikeCount(postId);
    return { likeCount };
  },
};

export default BoardService;
