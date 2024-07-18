export interface postRefreshTokenReqBodyDto {
    email: string
}

export interface postRefreshTokenReqHeadersDto {
    accessToken: string,
    refreshToken: string
}

