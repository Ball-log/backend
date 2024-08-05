import { sign, verify, refreshVerify } from "./../../../utils/jwt.utils";
import jwt  from "jsonwebtoken";
import { postRefreshTokenReqHeadersDto as headers } from "../../../models/auth/refreshToken/refreshToken.dto";
import { status } from "../../../../config/response.status";

// import { ApiError } from "../../../../config/error";
import { ApiError } from "../../../../config/error";

export const postRefreshTokenService = async (headers: headers) => {
    if (headers.accessToken && headers.refreshToken) {
        const authToken = headers.accessToken.split(" ")[1];

        const refreshToken = headers.refreshToken;
        const authResult = verify(authToken);

        // access token 디코딩하여 user의 정보를 가져옵니다.
        const decoded = jwt.decode(authToken) as jwt.JwtPayload;

        if (decoded === null) {
            throw new ApiError(status.ACCESS_TOKEN_UNMATCHED);
        }

        const refreshResult = await refreshVerify(refreshToken, decoded.sub as string);
        if (authResult.ok === false && authResult.message === "jwt expired") {
            // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
            if (refreshResult === false) {
                throw new ApiError(status.REFRESH_TOKEN_UNMATCHED);
            } else {
                // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
                const newAccessToken = sign(decoded.sub as string);
                return newAccessToken;
            }
        } else {
            // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
            throw new ApiError(status.ACCESS_TOKEN_IS_VALID);
        }

    } else { // access token 또는 refresh token이 헤더에 없는 경우
        if (!headers.accessToken && !headers.refreshToken) {
            throw new ApiError(status.THERE_IS_NO_TOKEN);
        } else if (!headers.refreshToken) {
            throw new ApiError(status.THERE_IS_NO_REFRESH_TOKEN);
        } else {
            throw new ApiError(status.THERE_IS_NO_ACCESS_TOKEN);
        }

    }
};

