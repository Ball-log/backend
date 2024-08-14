export const fcmSql = {
  getCommunityWriter: `
        SELECT user_id, created_at
        FROM community
        WHERE id = ?;
    `,
  getBlogWriter: `
        SELECT user_id, created_at
        FROM blog
        WHERE id = ?;
    `,
  getMVPWriter: `
        SELECT user_id, created_at
        FROM mvp
        WHERE id = ?;
    `,
  getCommentWriter: `
        SELECT user_id, created_at
        FROM comment
        WHERE id = ?;
    `,
};
