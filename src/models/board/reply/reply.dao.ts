import { ResultSetHeader } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { replyDeleteDto, replyPatchDto, replyPostDto } from "./reply.dto";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { replySql } from "./reply.sql";

export const replyDao = {
    post: async (req: replyPostDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(replySql.post, [
                req.body,
                req.post_id,
                user_id,
                req.comment_id,
                req.type
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    patch: async (req: replyPatchDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(replySql.patch, [
                req.body,
                req.id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    },
    delete: async (req: replyDeleteDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(replySql.delete, [
                req.id,
                user_id
            ]);
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new ApiError(status.DATA_INSERTED_SQL_ERROR);
        }
    }
};
