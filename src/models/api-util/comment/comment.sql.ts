export const commentSql = {
    post: "INSERT INTO comment (body, post_id, user_id, post_type) VALUES(?, ?, ?, ?)",
    patch: "UPDATE comment SET body = ? WHERE id = ? and user_id = ?",
    delete: "DELETE FROM comment WHERE id =? and user_id =?"
};
