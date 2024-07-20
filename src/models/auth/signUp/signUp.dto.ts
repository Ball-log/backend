export interface getSignUpLocalsDto extends Request {
    id: string,
    email: string,
    name: string
}

export interface getSignUpReqDto {
    nickname: string,
    team_id: number
}
