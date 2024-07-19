import { postSignUpLocalsDto } from "./signUp.dto";
import { postSignUpSql, checkEmailSql } from "./signUp.sql";
import { getPool }  from "./../../../../config/db.pool";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// import { status } from "../../../../config/response.status";

// import { ApiError } from "../../../config/error";

export const postSignUpDao = async (user: postSignUpLocalsDto): Promise<number> => {
    const connection = await getPool().getConnection();
    try {
        const [ CheckEamil ] = await connection.query<RowDataPacket[]>(checkEmailSql, user.email);
        const isEmailExist = CheckEamil[0].isExistEmail;

        if (isEmailExist) {
            connection.release();
            return -1;
        }
        const [ result ] = await connection.query<ResultSetHeader>(postSignUpSql,
            [ user.id, user.email, user.name ]);
        connection.release();
        return result.insertId;

    } catch (e) {
        console.log(e);
        throw new Error();
    }
};
