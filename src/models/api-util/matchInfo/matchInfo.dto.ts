export interface matchInfoDto {
    match_date: Date,
    match_id: number,
    home_team_id: number,
    away_team_id: number,
    home_team_name: string,
    away_team_name: string,
    home_team_icon_flag: string;
    away_team_icon_flag: string;
    home_team_score: number;
    away_team_score: number;
}