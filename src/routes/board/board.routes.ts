import { Router } from "express";
import asyncHandler from "express-async-handler";
import BoardController from "../../features/board/board.controller";

export const boardRouter = Router();

// 게시글 작성 라우트 (블로그와 MVP 통합)
boardRouter.post("/board/post", asyncHandler(BoardController.post));

// 게시글 수정 라우트
boardRouter.put(
  "/board/post/:postId",
  asyncHandler(BoardController.updatePost)
);

// 게시글 삭제 라우트
boardRouter.delete(
  "/board/post/:postId",
  asyncHandler(BoardController.deletePost)
);

// 게시글 상세 조회 라우트
boardRouter.get("/board/post/:postId", asyncHandler(BoardController.getPost));

// 댓글 작성 라우트
boardRouter.post(
  "/board/post/:postId/comments",
  asyncHandler(BoardController.postComment)
);

// 댓글 조회 라우트
boardRouter.get(
  "/board/post/:postId/comments",
  asyncHandler(BoardController.getComments)
);

// 댓글 수정 라우트
boardRouter.put(
  "/board/comments/:commentId",
  asyncHandler(BoardController.updateComment)
);

// 댓글 삭제 라우트
boardRouter.delete(
  "/board/comments/:commentId",
  asyncHandler(BoardController.deleteComment)
);

// 좋아요 토글 라우트
boardRouter.post(
  "/board/post/:postId/like",
  asyncHandler(BoardController.toggleLike)
);

export default boardRouter;
