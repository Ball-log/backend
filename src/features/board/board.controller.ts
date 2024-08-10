import { application, Request, Response } from "express";
import BoardService from "./board.service";
import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

const BoardController = {

    // 게시글 작성
    post: async (req: Request, res: Response) => {
        const user_id = res.locals.id;
        try {
            const result = await BoardService.insertPost(req.body, user_id);
            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    // 게시글 상세 조회
    get: async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId;
            const postDetails = await BoardService.getPostDetails(postId);
            res.json(postDetails);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    // 댓글 작성
    postComment: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id;
            const postId = parseInt(req.params.postId);
            const result = await BoardService.postComment(req.body, userId, postId);
            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    // 대댓글 작성
    postReply: async (req: Request, res: Response) => {
        const userId = res.locals.id;
        const postId = parseInt(req.params.postId);
        try {
            const result = await BoardService.postReply(req.body, userId, postId);
            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    //토클 스위치
    PostToggleLike: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id; // 사용자 id
            const postId = req.params.postId; // 게시글 id
            const result = await BoardService.PostToggleLike(userId, postId);
            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    }
    // //게시글 수정
    // updatePost: async (req: Request, res: Response) => {
    //   try {
    //     const userId = res.locals.id;
    //     const postId = req.params.postId;
    //     const title = req.body.title;
    //     const body = req.body.body;
    //     const publicStatus = req.body.public;
    //     const thumbnailUrl = req.body.thumbnailUrl;
    //     const matchInfo = req.body.matchInfo;
    //     const type = req.body.type;
    //     const playerId = type === "mvp" ? req.body.playerImage : undefined;
    //     const playerRecord = type === "mvp" ? req.body.playerRecord : undefined;

    //     const result = await BoardService.updatePost(
    //       postId,
    //       title,
    //       body,
    //       publicStatus,
    //       thumbnailUrl,
    //       matchInfo,
    //       userId,
    //       type,
    //       playerId,
    //       playerRecord
    //     );

    //     res.json(result);
    //   } catch (err) {
    //     console.log(err);
    //     if (err instanceof ApiError) {
    //       res.json(err.data.body);
    //     } else {
    //       res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
    //     }
    //   }
    // },

    // 개시글 삭제
    deletePost: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id; // 사용자 id
            const postId = req.params.postId; // 삭제할 게시글 id

            const result = await BoardService.deletePost(postId, userId);
            res.json(result);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },


    

    getComments: async (req: Request, res: Response) => {
        try {
            const postId = req.params.postId;
            const comments = await BoardService.getComments(postId);
            res.json(comments);
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    // 댓글 수정
    updateComment: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id; // 사용자 id
            const commentId = req.params.commentId; // 수정할 댓글 id
            const body = req.body.body; // 수정할 내용

            await BoardService.updateComment(commentId, body, userId);
            res.json({ message: "댓글이 수정되었습니다." });
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    // 댓글 삭제
    deleteComment: async (req: Request, res: Response) => {
        try {
            const userId = res.locals.id;
            const commentId = req.params.commentId;

            await BoardService.deleteComment(commentId, userId);
            res.json({ message: "댓글이 삭제되었습니다." });
        } catch (err) {
            console.log(err);
            if (err instanceof ApiError) {
                res.json(err.data.body);
            } else {
                res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
            }
        }
    },

    // 좋아요 토글

};

export default BoardController;
