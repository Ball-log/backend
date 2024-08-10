const BoardSQL = {
  //게시글 ID로 게시글 조회
  getPostById: `
  SELECT id, title, publicStatus, thumbnailUrl AS thumbnailUrl, created_at AS createdAt, updated_at AS updatedAt, user_id AS userId
  FROM posts,
  WHERE id = ?
  `,

  //게시글 삽입
  insertPost: `
      INSERT INTO blog(title, body, thumbnail_url, created_at, updated_at, user_id)
      VALUES (?, ?, ?, NOW(), NOW(), ?)
    `,
  // 게시글 수정
  updatePost: `
    UPDATE posts
    SET title = ? body, publicStatus = ?, thumbnail_url = ?, updated_at = NOW(), user_id = ?
    WHERE id = ?
    `,

  //mvp 게시글 삽입
  insertMvp: `
      INSERT INTO mvp_posts (title, player_id, player_record, publicStatus, thumbnail_url, created_at, updated_at, user_id)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)
    `,

  //mvp 게시글 수정
  updateMvp: `
    UPDATE mvp_posts
    SET title = ?, player_id = ?, publicStatus = ?, thumbnail_url = ?, updated_at = NOW(), user_id = ?
    WHERE id = ?
    `,

  //경기 정보 삽입
  insertMatchInfo: `
  INSERT INTO matchinfo(home_team_id, away_team_id, match_date, post_id, home_team_score, home_team_score)
  VALUES(?, ?, ?, ?, ?, ?)
  `,

  // // 경기 정보 수정
  // updateMatchInfo: `
  // UPDATE matchinfo
  // SER home_team_id = ?, away_team_id = ?, match_date = ?, home_team_score = ?, away_team_score = ?
  // WHERE post_id = ?
  // `,

  // 게시글의 이미지 삭제
  deleteImagesFromPost: `
  DELETE FROM post_images WHERE post_id = ?
  `,

  //게시글에 이미지 삽입
  insertImageIntoPost: `
      INSERT INTO post_images (url, post_id)
      VALUES (?, ?)
    `,

  //게시글 삭제
  deletePost: `
  DELETE FROM posts WHERE id = ?
  `,

  //게시글 작성자 ID 조회
  getPostAuthorId: `
      SELECT user_id FROM posts WHERE id = ?
    `,

  //댓글 삽입
  insertComment: `
    INSERT INTO comments(post_id, user_id, body, post_type)
    VALUES(?, ?, ?, ?)
    `,

  //대댓글 삽입
  insertReply: `
    INSERT INTO replies(post_id, user_id, comment_id, body, post_type)
    VALUES(?, ?, ?, ?, ?)
    `,

  //댓글 조회
  getComments: `
    SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC
    `,

  //댓글 수정
  updateComment: `
    UPDATE comments SET body = ? WHERE id = ?
    `,

  // 댓글 삭제
  deleteComment: `
    DELETE FROM comments WHERE id = ?
    `,

  //댓글 id로 댓글 조회
  getCommentById: `
    SELECT * FROM comments WHERE id = ?
    `,

  //좋아요 추가
  addLike: `
    INSERT INTO likes (user_id, post_id, created_at, updated_at, post_type)
    VALUES(?, ?, ?, ?, ?)
    `,

  // 좋아요 취소
  removeLike: `
    DELETE FROM likes WHERE user_id = ? AND post_id = ?
    `,

  // 좋아요 눌렀는지 확인
  checkUserLike: `
    SELECT * FROM likes WHERE user_id = ? AND post_id = ?
    `,

  // 좋아요 수
  getLikeCount: `
    SELECT COUNT(*) AS likeCount FROM likes WHERE post_id = ?
    `,
};

export default BoardSQL;
