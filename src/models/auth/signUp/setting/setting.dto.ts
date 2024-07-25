export interface getSettingDto {
    user_id: string,
    user_icon: string,
    user_name: string,
    team_info:
    {
        team_id: number,
        team_name: string,
        team_icon_flag: string
    }[]

}
