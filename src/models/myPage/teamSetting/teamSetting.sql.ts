export const teamSetSql = {

    getSql: "select id as team_id, name as team_name, icon_flag as team_icon_flag FROM team",
    patchSql: "UPDATE user SET team_id = ? WHERE id = ?"

};
