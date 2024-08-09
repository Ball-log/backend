import { ResultSetHeader, RowDataPacket } from "mysql2";
import BoardSQL from "./board.sql";
import { getPool } from "../../../config/db.pool";
import { PostDto } from "./board.dto";
import { populate } from "dotenv";

const BoardDao = {
  insertPost: async (
    title: string,
    matchResult: string,
    content: string,
    userId: string,
    type: string
  ): Promise<number> => {
    const pool = getPool();

    const [result] = await pool.query<ResultSetHeader>(BoardSQL.insertPost, [
      title,
      matchResult,
      content,
      userId,
      type,
    ]);

    return result.insertId;
  },

  insertImageIntoPost: async (url: string, postId: string): Promise<void> => {
    const pool = getPool();
    await pool.query(BoardSQL.insertImageIntoPost, [url, postId]);
  },

  getPostAuthorId: async (postId: string): Promise<string> => {
    const pool = getPool();
    const [result] = await pool.query<RowDataPacket[]>(
      BoardSQL.getPostAuthorId,
      [postId]
    );
    return result[0].userId;
  },

  insertMvp: async (
    title: string,
    playerImage: string,
    matchResult: string,
    content: string,
    userId: string
  ): Promise<number> => {
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(BoardSQL.insertMvp, [
      title,
      playerImage,
      matchResult,
      content,
      userId,
    ]);
    return result.insertId;
  },

  getPost: async (postId: string): Promise<PostDto | null> => {
    const pool = getPool();
    const [results] = await pool.query<RowDataPacket[]>(BoardSQL.getPostById, [
      postId,
    ]);
    return results.length > 0 ? (results[0] as PostDto) : null;
  },

  insertComment: async (
    postId: string,
    userId: string,
    content: string,
    parentId?: string
  ): Promise<number> => {
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(BoardSQL.insertComment, [
      postId,
      userId,
      content,
      parentId || null, //Null은 부모 댓글이 없을 경우
    ]);
    return result.insertId;
  },

  //댓글 id로 댓글 갖고오기
  getCommentById: async (commentId: string): Promise<RowDataPacket | null> => {
    const pool = getPool();
    const [results] = await pool.query<RowDataPacket[]>(
      BoardSQL.getCommentById,
      [commentId]
    );
    return results.length > 0 ? results[0] : null;
  },

  getComments: async (postId: string): Promise<RowDataPacket[]> => {
    const pool = getPool();
    const [results] = await pool.query<RowDataPacket[]>(BoardSQL.getComments, [
      postId,
    ]);
    return results;
  },

  updateComment: async (
    commentId: string,
    content: string
  ): Promise<boolean> => {
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(BoardSQL.updateComment, [
      content,
      commentId,
    ]);
    return result.affectedRows > 0;
  },

  deleteComment: async (commentId: string): Promise<boolean> => {
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(BoardSQL.deleteComment, [
      commentId,
    ]);
    return result.affectedRows > 0;
  },

  updatePost: async (
    postId: string,
    title: string,
    matchResult: string,
    content: string,
    userId: string,
    type: string
  ): Promise<void> => {
    const pool = getPool();
    await pool.query(BoardSQL.updatePost, [
      title,
      matchResult,
      content,
      userId,
      type,
      postId,
    ]);
  },

  updateMvp: async (
    postId: string,
    title: string,
    playerImage: string,
    matchResult: string,
    content: string,
    userId: string
  ): Promise<void> => {
    const pool = getPool();
    await pool.query(BoardSQL.updateMvp, [
      title,
      playerImage,
      matchResult,
      content,
      userId,
      postId,
    ]);
  },

  deleteImagesFromPost: async (postId: string): Promise<void> => {
    const pool = getPool();
    await pool.query(BoardSQL.deleteImagesFromPost, [postId]);
  },

  deletePost: async (postId: string): Promise<boolean> => {
    const pool = getPool();
    const [result] = await pool.query<ResultSetHeader>(BoardSQL.deletePost, [
      postId,
    ]);
    return result.affectedRows > 0;
  },
  //좋아요 추가
  addLike: async (userId: string, postId: string): Promise<void> => {
    const pool = getPool();
    await pool.query(BoardSQL.addLike, [userId, postId]);
  },

  //좋아요 삭제
  removeLike: async (userId: string, postId: string): Promise<void> => {
    const pool = getPool();
    await pool.query(BoardSQL.removeLike, [userId, postId]);
  },

  //사용자 좋아요 여부 확인
  checkUserLike: async (userId: string, postId: string): Promise<boolean> => {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(BoardSQL.checkUserLike, [
      userId,
      postId,
    ]);
    return rows.length > 0;
  },

  //게시글 총 좋아요 수
  getLikeCount: async (postId: string): Promise<number> => {
    const pool = getPool();
    const [rows] = await pool.query<RowDataPacket[]>(BoardSQL.getLikeCount, [
      postId,
    ]);
    return rows.length > 0 ? rows[0].likeCount : 0;
  },
};

export default BoardDao;
