interface teamInfo {
    team_id: number,
    team_name: string,
    team_icon_flag: string
}

export type getTeamSetReqDto = teamInfo[];

export interface patchTeamSetDto {
    team_id: number
}
