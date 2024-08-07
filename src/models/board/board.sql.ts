const BoardSQL = {
  insertPost: `
      INSERT INTO posts (title, match_result, content, user_id, type)
      VALUES (?, ?, ?, ?, ?)
    `,

  insertImageIntoPost: `
      INSERT INTO post_images (url, post_id)
      VALUES (?, ?)
    `,

  getPostAuthorId: `
      SELECT user_id FROM posts WHERE id = ?
    `,

  insertMvp: `
      INSERT INTO mvp_posts (title, player_image, match_result, content, user_id)
      VALUES (?, ?, ?, ?, ?)
    `,

  insertComment: `
    INSERT INTO comments(post_id, user_id, content, parent_id)
    VALUES(?, ?, ?, ?)
    `,

  getComments: `
    SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC
    `,

  //댓글 수정
  updateComment: `
    UPDATE comments SET content = ? WHERE id = ?
    `,

  //댓글 id로 댓글 조회
  getCommentById: `
    SELECT * FROM comments WHERE id = ?
    `,

  deletePost: `
    DELETE FROM posts WHERE id = ?
    `,
  //좋아요 관련 쿼리
  addLike: `
    INSERT INTO likes (user_id, post_id)
    VALUES(?, ?)
    ON DUPLICATE KEY UPDATE post_id = post_id
    `,

  removeLike: `
    DELETE FROM likes WHERE user_id = ? AND post_id = ?
    `,

  checkUserLike: `
    SELECT * FROM likes WHERE user_id = ? AND post_id = ?
    `,

  getLikeCount: `
    SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?
    `,
};

export default BoardSQL;
