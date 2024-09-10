export const alarmSql = {
    post: "INSERT INTO alarm (post_user_id, post_id, post_type, message) VALUES (?, ?, ?, ?)",
    get: "SELECT * from alarm WHERE post_user_id = ?",
    delete: "DELETE FROM alarm WHERE id = ? and post_user_id = ?"
};
