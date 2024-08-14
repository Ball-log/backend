import { ResultSetHeader } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { post_likeDto } from "./post_like.dto";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { post_likeSql } from "./post_like.sql";

export const post_likeDao = {
    post: async (req: post_likeDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(post_likeSql.post, [
                req.post_id,
                user_id,
                req.post_type
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    delete: async (req: post_likeDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(post_likeSql.delete, [
                user_id,
                req.post_id,
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
};