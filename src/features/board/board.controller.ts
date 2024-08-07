import { Request, Response } from "express";
import BoardService from "./board.service";
import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";
import { responseEncoding } from "axios";

const BoardController = {
  //   postBlog: async (req: Request, res: Response) => {
  //     try {
  //       const userId = res.locals.id; //사용자 id
  //       const title = req.body.title; //제목
  //       const matchResult = req.body.matchResult; //경기 결과
  //       const content = req.body.content; // 본문 내용
  //       const imageUrls = req.body.imageUrls; // 이미지 URL
  //       const type = req.body.type; // 'blog' | 'mvp'

  //       const result = await BoardService.insertBlog(
  //         title,
  //         matchResult,
  //         content,
  //         imageUrls,
  //         userId,
  //         type
  //       );

  //       res.json(result);
  //     } catch (err) {
  //       console.log(err);
  //       if (err instanceof ApiError) {
  //         res.json(err.data.body);
  //       } else {
  //         res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
  //       }
  //     }
  //   },

  //   postMvp: async (req: Request, res: Response) => {
  //     try {
  //       const userId = res.locals.id; //사용자 id
  //       const playerImage = req.body.playerImage; // 선수 사진 url
  //       const title = req.body.title; //제목
  //       const matchResult = req.body.matchResult; //경기 결과
  //       const content = req.body.content; // 본문 내용
  //       const imageUrls = req.body.imageUrls; // 이미지 url
  //       const type = req.body.type; // 'blog' | 'mvp'

  //       const result = await BoardService.insertMvp(
  //         title,
  //         playerImage,
  //         matchResult,
  //         content,
  //         imageUrls,
  //         userId,
  //         type
  //       );

  //       res.json(result);
  //     } catch (err) {
  //       console.log(err);
  //       if (err instanceof ApiError) {
  //         res.json(err.data.body);
  //       } else {
  //         res.json(new ApiError(status.UNKNOWN_ERROR).data.body);
  //       }
  //     }
  //   },
  post: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const title = req.body.title;
      const matchResult = req.body.matchResult;
      const content = req.body.content;
      const imageUrls = req.body.imageUrls;
      const type = req.body.type; // 'blog' | 'mvp'
      const playerImage = type === "mvp" ? req.body.playerImage : undefined;

      const result = await BoardService.insertPost(
        title,
        matchResult,
        content,
        imageUrls,
        userId,
        type,
        playerImage
      );

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

  postComment: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id;
      const postId = req.params.postId;
      const content = req.body.content;
      const parentId = req.body.parentId;
      const result = await BoardService.addComment(
        postId,
        userId,
        content,
        parentId
      );
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

  //개시글 삭제
  deletePost: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id; //사용자 id
      const postId = req.params.postId; //삭제할 게시글 id

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

  //댓글 수정
  updateComment: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id; //사용자 id
      const commentId = req.params.commentId; //수정할 댓글 id
      const content = req.body.content; //수정할 내용

      await BoardService.updateComment(commentId, content, userId);
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

  //좋아요 토글
  toggleLike: async (req: Request, res: Response) => {
    try {
      const userId = res.locals.id; //사용자 id
      const postId = req.params.postId; //게시글 id

      const result = await BoardService.toggleLike(userId, postId);

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
};

export default BoardController;
