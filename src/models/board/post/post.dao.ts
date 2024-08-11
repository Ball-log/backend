import { ResultSetHeader } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { blogDto, mvpDto } from "./post.dto";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { postSql } from "./post.sql";


export const postDao = {
    postBlog: async (req: blogDto, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.postBlog, [
                req.title,
                req.body,
                req.thumbnailUrl,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    postMvp: async (req: mvpDto, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.postMvp, [
                req.playerId,
                req.playerRecord,
                req.thumbnailUrl,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    patchBlog: async (req: blogDto, post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.patchBlog, [
                req.title,
                req.body,
                req.thumbnailUrl,
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    patchMvp: async (req: mvpDto, post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.patchMvp, [
                req.playerId,
                req.playerRecord,
                req.thumbnailUrl,
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    deleteBlog: async (post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.deleteBlog, [
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    deleteMvp: async (post_id: number, user_id: string): Promise<number> => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(postSql.deleteMvp, [
                post_id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
}