import { Request, Response } from "express";
import BlogService from "./blog.service";

import { ApiError } from "../../../config/error";
import { status } from "../../../config/response.status";

interface CustomRequest extends Request {
  user?: {
    id: number;
  };
}

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

// 블로그 좋아요 토글
export const toggleBlogLikeController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const postId = parseInt(req.params.postId);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "인증된 사용자가 아닙니다." });
    }

    const { likeCount, isLiked } = await BlogService.toggleBlogLike(
      postId,
      userId as number
    ); // userId를 number로 변환

    res.status(200).json({
      isSuccess: true,
      code: "200",
      message: isLiked ? "좋아요를 눌렀습니다." : "좋아요를 취소했습니다.",
      result: { likeCount },
    });
  } catch (error) {
    const errorMsg = (error as Error).message;
    res.status(500).json({ error: errorMsg });
  }
};

//블로그 댓글 작성

//블로그 대댓글 작성
