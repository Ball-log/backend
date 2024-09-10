export interface getMyPageResDto {
    team_id: string,
    team_icon_round: string,
    user_background_img: string,
    user_name: string,
    user_icon_url: string,
    match_id: number,
    match_state: string,
    match_date: string,
    user_team_icon_flag: string,
    opposition_icon_flag: string,
    user_team_score: number,
    opposition_score: number,
    writed_date_list: string[] | null
}
