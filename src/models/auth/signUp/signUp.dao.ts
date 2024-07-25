import { getSignUpLocalsDto } from "./signUp.dto";
import { getSignUpSql, checkEmailSql } from "./signUp.sql";
import { getPool }  from "./../../../../config/db.pool";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// import { status } from "../../../../config/response.status";

// import { ApiError } from "../../../config/error";

export const getSignUpDao = async (user: getSignUpLocalsDto): Promise<number> => {
    const connection = await getPool().getConnection();
    try {
        const [ CheckEamil ] = await connection.query<RowDataPacket[]>(checkEmailSql, user.email);
        const isEmailExist = CheckEamil[0].isExistEmail;

        if (isEmailExist) {
            connection.release();
            return -1;
        }
        const [ result ] = await connection.query<ResultSetHeader>(getSignUpSql,
            [ user.id, user.email, user.name, user.icon ]);
        connection.release();
        return result.insertId;

    } catch (e) {
        console.log(e);
        throw new Error();
    }
};
