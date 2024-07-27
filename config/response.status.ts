import { StatusCodes } from "http-status-codes";
import { BaseApiResponse } from "./response";

export type ResponseType = "SUCCESS" | "NOT_FOUND" | "EMAIL_ALREADY_EXIST" | "LOGIN_INFO_UNMATCHED" | "ACCESS_TOKEN_EXPIRED" | "REFRESH_TOKEN_UNMATCHED" |
                            "ACCESS_TOKEN_IS_VALID" | "ACCESS_TOKEN_UNMATCHED" | "THERE_IS_NO_ACCESS_TOKEN" | "THERE_IS_NO_REFRESH_TOKEN" | "THERE_IS_NO_TOKEN" |
                            "DATA_INSERTED_SQL_ERROR" | "REQUEST_BODY_INVALID";


export type ResponseWithStatus = {
    status: StatusCodes,
    body: Omit<BaseApiResponse<unknown>, "result">
};

export const status: Record<ResponseType, ResponseWithStatus> = {
    SUCCESS: {
        status: StatusCodes.OK,
        body: { isSuccess: true, code: "200", message: "success!" }
    },
    NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        body: { isSuccess: false, code: "404", message: "Not Found." }
    },
    EMAIL_ALREADY_EXIST: {
        status: StatusCodes.BAD_REQUEST,
        body: { isSuccess: false, code: "400", message: "email already exist." }
    },
    LOGIN_INFO_UNMATCHED :{
        status: StatusCodes.BAD_REQUEST,
        body: { isSuccess: false, code: "400", message: "login information unmatched." }
    },
    ACCESS_TOKEN_EXPIRED: {
        status: StatusCodes.UNAUTHORIZED,
        body: { isSuccess: false, code: "401", message: "access token expired."}
    },
    REFRESH_TOKEN_UNMATCHED: {
        status: StatusCodes.UNAUTHORIZED,
        body: { isSuccess: false, code: "401", message: "refresh token unmatched."}
    },
    ACCESS_TOKEN_IS_VALID: {
        status: StatusCodes.BAD_REQUEST,
        body: { isSuccess: false, code: "400", message: "access token is valid." }
    },
    ACCESS_TOKEN_UNMATCHED: {
        status: StatusCodes.UNAUTHORIZED,
        body: { isSuccess: false, code: "401", message: "access token unmatched."}
    },
    THERE_IS_NO_ACCESS_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        body: { isSuccess: false, code: "401", message: "there is no access token."}
    },
    THERE_IS_NO_REFRESH_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        body: { isSuccess: false, code: "401", message: "there is no refresh token."}
    },
    THERE_IS_NO_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        body: { isSuccess: false, code: "401", message: "there is no token."}
    },
    DATA_INSERTED_SQL_ERROR: {
        status: StatusCodes.BAD_REQUEST,
        body: { isSuccess: false, code: "400", message: "there is an error in the SQL syntax for inserting data." }
    },
    REQUEST_BODY_INVALID: {
        status: StatusCodes.BAD_REQUEST,
        body: { isSuccess: false, code: "400", message: "request body is invalid." }
    }
};