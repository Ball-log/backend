import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getPool } from "../../../../config/db.pool";
import { fcmSql } from "./fcm.sql";
import { ApiError } from "../../../../config/error";
import { fcmDto } from "./fcm.dto";

export const fcmDao = {
  getCommunityWriter: async (post_id: string): Promise<fcmDto | null> => {
    const connection = await getPool().getConnection();
    try {
      const [result] = await connection.query<RowDataPacket[]>(
        fcmSql.getCommunityWriter,
        [post_id]
      );
      connection.release();
      return {
        user_id: result[0].user_id,
        created_at: result[0].created_at,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getBlogWriter: async (post_id: string): Promise<fcmDto | null> => {
    const connection = await getPool().getConnection();
    try {
      const [result] = await connection.query<RowDataPacket[]>(
        fcmSql.getBlogWriter,
        [post_id]
      );
      connection.release();
      return {
        user_id: result[0].user_id,
        created_at: result[0].created_at,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getMVPWriter: async (post_id: string): Promise<fcmDto | null> => {
    const connection = await getPool().getConnection();
    try {
      const [result] = await connection.query<RowDataPacket[]>(
        fcmSql.getMVPWriter,
        [post_id]
      );
      connection.release();
      return {
        user_id: result[0].user_id,
        created_at: result[0].created_at,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getCommentWriter: async (comment_id: string): Promise<fcmDto | null> => {
    const connection = await getPool().getConnection();
    try {
      const [result] = await connection.query<RowDataPacket[]>(
        fcmSql.getCommentWriter,
        [comment_id]
      );
      connection.release();
      return {
        user_id: result[0].user_id,
        created_at: result[0].created_at,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
