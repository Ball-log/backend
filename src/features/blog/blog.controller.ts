import { Request, Response } from "express";
import BlogService from "./blog.service";

import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

//새로운 블로그 글 작성
export const createPostController = async (req: Request, res: Response) => {
  try {
    const postData = req.body; //글 작성 데이터
    const newPost = await BlogService.createBlogPost(postData); //새로 생성한 블로그 글
    res.status(201).json(newPost);
  } catch (error) {
    const errorMsg = (error as Error).message;
    res.status(500).json({ error: errorMsg });
  }
};

//블로그 글 목록 조회
export const getBlogPostsController = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const cursor = req.query.cursor
      ? parseInt(req.query.cursor as string)
      : undefined;
    const result = await BlogService.getBlogPosts(page, cursor);
    res.json(result);
  } catch (error) {
    const errorMsg = (error as Error).message;
    res.status(500).json({ error: errorMsg });
  }
};
