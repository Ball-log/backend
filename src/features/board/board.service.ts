import { ApiError } from "../../../config/error";
import { BaseApiResponse } from "../../../config/response";
import { status } from "../../../config/response.status";
import BoardDao from "../../models/board/board.dao";
import { emptyDto } from "../../models/empty.dto";

import { CommentDto, MvpDto, blogDto } from "../../models/board/board.dto";

import boardRouter from "../../routes/board/board.routes";

const BoardService = {
    insertPost: async (req: MvpDto | blogDto, user_id: string) => {

        if (req.type === "blog") {
            const result = await BoardDao.insertblog(req, user_id);
            const body: BaseApiResponse<number> = {
                ...status.SUCCESS.body,
                result: result
            };
            return body;
        } else {
            const result = await BoardDao.insertMvp(req, user_id);
            const body: BaseApiResponse<number> = {
                ...status.SUCCESS.body,
                result: result
            };
            return body;
        }
    },
    postComment: async (req: CommentDto, user_id: string, post_id: number) => {
        
      const result = await BoardDao.insertComment(req, user_id, post_id);
      const body: BaseApiResponse<number> = {
        ...status.SUCCESS.body,
        result: result
      };
      return body;
  }, 
  postReply: async (req: CommentDto, user_id: string, post_id: number) => {
      
    const result = await BoardDao.insertReply(req, user_id, post_id);
    const body: BaseApiResponse<number> = {
      ...status.SUCCESS.body,
      result: result
    };
    return body;
  } 

    getPostDetails: async (postId: string) => {
        const post = await BoardDao.getPost(postId);

        const comments = await BoardDao.getComments(postId);
        const likeCount = await BoardDao.getLikeCount(postId);

        const response = {
            ...status.SUCCESS.body,
            result: {
                post,
                comments,
                likeCount
            }
        };
        return response;
    },


  

    getComments: async (postId: string) => {
        const comments = await BoardDao.getComments(postId);
        return comments;
    },

    // 게시글 수정
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

        // type(blog | mvp) 구분
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
            result: {}
        };

        return response;
    },

    // 게시글 삭제
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

    // 댓글 수정
    updateComment: async (commentId: string, content: string, userId: string) => {
        const comment = await BoardDao.getCommentById(commentId);
        if (!comment || comment.userId !== userId) {
            throw new ApiError(status.UNAUTHORIZED);
        }

        await BoardDao.updateComment(commentId, content);
    },

    // 댓글 삭제
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

    PostToggleLike: async (userId: string, postId: string) => {
        const hasLiked = await BoardDao.checkUserLike(userId, postId);

        if (hasLiked) {
            // 이미 좋아요를 누른 경우 취소
            await BoardDao.removeLike(userId, postId);
        } else {
            // 좋아요를 누르지 않았다면 좋아요 추가
            await BoardDao.addLike(userId, postId);
        }

        // 현재 좋아요 수 반환
        const likeCount = await BoardDao.getLikeCount(postId);
        return { likeCount };
    }
};

export default BoardService;
