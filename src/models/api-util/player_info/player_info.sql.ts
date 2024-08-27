export const player_info = {
    get: 
        `SELECT
            p.id as player_id,
            p.name as player_name,
            p.team_id as player_team_id,
            t.name as player_team_name,
            t.icon_flag as team_icon_flag,
            p.age as player_age,
        `,
}