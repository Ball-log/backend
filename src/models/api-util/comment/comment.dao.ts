import { ResultSetHeader } from "mysql2/promise";
import { getPool } from "../../../../config/db.pool";
import { commentDeleteDto, commentPatchDto, commentPostDto } from "./comment.dto";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { commentSql } from "./comment.sql";

export const commentDao = {
    post: async (req: commentPostDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(commentSql.post, [
                req.body,
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
    patch: async (req: commentPatchDto, user_id: string) => {
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(commentSql.patch, [
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
    delete: async (req: commentDeleteDto, user_id: string) => {
        console.log("in dao, req: ", req, "user_id: ", user_id);
        const connection = await getPool().getConnection();
        try {
            const [ result ] = await connection.query<ResultSetHeader>(commentSql.delete, [
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
