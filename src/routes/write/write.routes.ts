import { Router } from "express";
import asyncHandler from "express-async-handler";
import BlogController from "../../features/write/write.controller";

const blogRouter = Router();

// 블로그 게시물 목록 가져오기
blogRouter.get("/posts", asyncHandler(BlogController.getBlogPostsController));

// 블로그 게시물 생성하기
blogRouter.post("/post", asyncHandler(BlogController.postBlogPost));

// 블로그 게시물 좋아요 토글
blogRouter.patch(
  "/like/:postId",
  asyncHandler(BlogController.patchToggleLikeController)
);

// 블로그 게시물에 댓글 달기
blogRouter.post("/comment", asyncHandler(BlogController.postCommentController));

// 블로그 게시물에 대댓글 달기
blogRouter.post("/reply", asyncHandler(BlogController.postReplyController));

// 블로그 게시물 삭제하기
blogRouter.delete("/post/:postId", asyncHandler(BlogController.deleteBlogPost));

export default blogRouter;
