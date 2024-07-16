import { req_signUp } from "./signUp.dto";
import { PostSignUpSql, CheckEmailSql } from "./signUp.sql";
import { getPool }  from "./../../../../config/db.pool";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// import { status } from "../../../../config/response.status";

// import { ApiError } from "../../../config/error";

export const PostSignUpDao = async (user: req_signUp): Promise<string | number> => {
    const connection = await getPool().getConnection();
    try {
        const [ CheckEamil ] = await connection.query<RowDataPacket[]>(CheckEmailSql, user.email);
        const isEmailExist = CheckEamil[0].isExistEmail;

        if (isEmailExist) {
            connection.release();
            return -1;
        }
        const [ result ] = await connection.query<ResultSetHeader>(PostSignUpSql,
            [ user.email, user.password, user.team_id ]);
        connection.release();
        return result.info;

    } catch (e) {
        console.log(e);
        throw new Error();
    }
};
