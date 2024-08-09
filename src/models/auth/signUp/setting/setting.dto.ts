export interface getSettingResDto {
    user_icon: string,
    user_name: string,
    team_info:
    {
        team_id: number,
        team_name: string,
        team_icon_flag: string
    }[]

}

export interface patchSettingDto {
    user_icon: string,
    user_team_id: number
}

