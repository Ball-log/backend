export interface postSignUpLocalsDto extends Request {
    id: string,
    email: string,
    name: string
}

export interface postSignUpReqDto {
    nickname: string,
    team_id: number
}
