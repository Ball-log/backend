import { StatusCodes } from "http-status-codes";
import { BaseApiResponse } from "./response";

export type ResponseType = "SUCCESS" | "NOT_FOUND" | "EMAIL_ALREADY_EXIST"  


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
};