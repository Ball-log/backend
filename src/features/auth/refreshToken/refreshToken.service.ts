import { sign, verify, refreshVerify } from "./../../../utils/jwt.utils";
import jwt  from "jsonwebtoken";
import { postRefreshTokenReqBodyDto as body, postRefreshTokenReqHeadersDto as headers } from "../../../models/auth/refreshToken/refreshToken.dto";
import { BaseApiResponse } from "../../../../config/response";
import { status } from "../../../../config/response.status";

// import { ApiError } from "../../../../config/error";
import { JWT } from "../../../models/user/login/login.dto";

export const postRefreshTokenService = async (body: body, headers: headers) => {
    if (headers.accessToken && headers.refreshToken) {
        const authToken = headers.accessToken.split(" ")[1];

        const refreshToken = headers.refreshToken;
        const authResult = verify(authToken);

        // access token 디코딩하여 user의 정보를 가져옵니다.
        const decoded = jwt.decode(authToken) as jwt.JwtPayload;

        if (decoded === null) {
            return status.ACCESS_TOKEN_UNMATCHED.body;
        }

        const refreshResult = await refreshVerify(refreshToken, decoded.sub as string);
        if (authResult.ok === false && authResult.message === "jwt expired") {
            // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
            if (refreshResult === false) {
                return status.REFRESH_TOKEN_UNMATCHED.body;
            } else {
                // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
                const newAccessToken = sign(decoded.sub as string);
                const body: BaseApiResponse<JWT> = {
                    ...status.SUCCESS.body,
                    result: {
                        accessToken: newAccessToken
                    }
                };
                return body;
            }
        } else {
            // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
            return status.ACCESS_TOKEN_IS_VALID.body;
        }

    } else { // access token 또는 refresh token이 헤더에 없는 경우
        if (!headers.accessToken && !headers.refreshToken) {
            return status.THERE_IS_NO_TOKEN.body;
        } else if (!headers.refreshToken) {
            return status.THERE_IS_NO_REFRESH_TOKEN.body;
        } else {
            return status.THERE_IS_NO_ACCESS_TOKEN.body;
        }

    }
};

