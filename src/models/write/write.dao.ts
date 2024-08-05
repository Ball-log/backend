import { RowDataPacket } from "mysql2";
import BlogSQL from "./write.sql";
import { getPool } from "../../../config/db.pool";
import { PostThumbnail } from "./write.dto";
import { ExecutableBase } from "mysql2/typings/mysql/lib/protocol/sequences/ExecutableBase";
import { authAccessTokenMiddleware } from "../../utils/jwt.middleware";

const BlogDao = {
  //게시물 목록 가져오기
  getBlogPosts: async (
    page: number,
    cursor?: number
  ): Promise<{ totalCount: number; posts: PostThumbnail[] }> => {
    //페이지 첫 조회 시 빈 문자열
    const cursorCondition = cursor ? `AND a.id < ?` : "";
    const postCountQuery = BlogSQL.getBlogPosts.replace(
      "{{cursorCondition}}",
      cursorCondition
    );
    //post data를 가져오기 위한 쿼리
    const postsQuery = BlogSQL.getBlogPosts.replace(
      "{{cursorCondition}}",
      cursorCondition
    );

    const postCountParams: (string | number)[] = [];
    const postsParams: (string | number)[] = [];
    if (cursor) {
      postCountParams.push(cursor);
      postsParams.push(cursor);
    }

    postsParams.push(`${page}`);

    const pool = getPool();
    const [countRows] = await pool.execute(postCountQuery, postCountParams);
    const totalCount = (countRows as any[])[0].totalCount;

    if (totalCount == 0) {
      return { totalCount, posts: [] };
    }

    const [rows] = await pool.execute<RowDataPacket[]>(postsQuery, postsParams);
    // post 썸네일 매핑
    const posts: PostThumbnail[] = rows.map((row) => ({
      postId: row.id,
      title: row.title,
      body: row.body,
      authorName: row.user_name,
      date: row.created_at,
      likeCount: row.like_count,
      commentCount: row.comment_count,
      imageUrls: row.imageUrls ? row.imageUrls.split(", ") : [],
    }));

    return { totalCount, posts: posts };
  },

  insertBlogPost: async (
    title: string,
    body: string,
    userId: string,
    imageUrls: string[],
    matchDate: string,
    teamA: string,
    teamB: string,
    matchResult: string
  ): Promise<number> => {
    const pool = getPool();
    const [result] = await pool.query(BlogSQL.insertBlogPost, [
      title,
      body,
      userId,
    ]);
    const postId = (result as any).insertId;

    //imageUrl 저장
    if (imageUrls.length > 0) {
      const imageInsertPromises = imageUrls.map((url) => {
        return pool.query(BlogSQL.insertImageIntoPost, [url, postId]);
      });
      await Promise.all(imageInsertPromises);
    }

    //경기 결과 저장
    await pool.query(BlogSQL.insertMatchResult, [
      postId,
      matchDate,
      teamA,
      teamB,
      matchResult,
    ]);

    return postId;
  },

  getPostComments: async (postId: string): Promise<RowDataPacket[]> => {
    const pool = getPool();
    const [postCommentRows] = await pool.query<RowDataPacket[]>(
      BlogSQL.getPostComments,
      [postId]
    );

    return postCommentRows;
  },

  getPostReplies: async (postId: string): Promise<RowDataPacket[]> => {
    const pool = getPool();
    const [postReplyRows] = await pool.query<RowDataPacket[]>(
      BlogSQL.getPostReplies,
      [postId]
    );

    return postReplyRows;
  },

  getUserLikeStatus: async (
    userId: string,
    postId: string
  ): Promise<boolean> => {
    const pool = getPool();
    const [getUserLikeStatus] = await pool.query<RowDataPacket[]>(
      BlogSQL.getUserLikeStatus,
      [userId, postId]
    );

    return getUserLikeStatus[0].count > 0;
  },

  insertLike: async (userId: string, postId: string): Promise<void> => {
    const pool = getPool();
    await pool.query<RowDataPacket[]>(BlogSQL.insertLike, [userId, postId]);
  },

  deleteLike: async (userId: string, postId: string): Promise<void> => {
    const pool = getPool();
    await pool.query<RowDataPacket[]>(BlogSQL.deleteLike, [userId, postId]);
  },

  insertPostComment: async (userId: string, postId: string, body: string) => {
    const pool = getPool();
    await pool.query<RowDataPacket[]>(BlogSQL.insertPostComment, [
      postId,
      userId,
      body,
    ]);
  },

  insertPostReply: async (
    userId: string,
    commentId: string,
    postId: string,
    body: string
  ) => {
    const pool = getPool();
    await pool.query<RowDataPacket[]>(BlogSQL.insertPostReply, [
      postId,
      commentId,
      userId,
      body,
    ]);
  },

  getPostAuthorId: async (postId: string): Promise<string> => {
    const pool = getPool();
    const [result] = await pool.query<RowDataPacket[]>(
      BlogSQL.getPostAuthorId,
      [postId]
    );
    return (result[0] as any).user_id;
  },

  insertImageIntoPost: async (url: string, postId: string) => {
    const pool = getPool();
    await pool.query(BlogSQL.insertImageIntoPost, [url, postId]);
  },

  insertMatchResult: async (
    postId: number,
    matchDate: string,
    teamA: string,
    teamB: string,
    matchResult: string
  ) => {
    const pool = getPool();
    await pool.query(BlogSQL.insertMatchResult, [
      postId,
      matchDate,
      teamA,
      teamB,
      matchResult,
    ]);
  },

  deleteBlogPost: async (postId: string) => {
    const pool = getPool();
    await pool.query(BlogSQL.deleteBlogPost, [postId]);
  },
};

export default BlogDao;
