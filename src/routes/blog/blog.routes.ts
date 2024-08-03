import express from "express";
import { Router } from "express";
import {
  createPostController,
  getBlogPostsController,
} from "../../features/blog/blog.controller";

export const blogRouter = Router();

//새 글 작성 라우터
blogRouter.post("/blog/posts/articles", createPostController);

//블로그 글 목록 조회 라우터
blogRouter.get("/blog/posts", getBlogPostsController);

export default blogRouter;
