const BoardSQL = {
  //게시글 ID로 게시글 조회
  getPostById: `
  SELECT id, title, match_result, AS matchResult, content, created_at AS createdAt, user_id AS userId
  FROM posts,
  WHERE id = ?
  `,

  //게시글 삽입
  insertPost: `
      INSERT INTO posts (title, match_result, content, user_id, type)
      VALUES (?, ?, ?, ?, ?)
    `,

  //게시글에 이미지 삽입
  insertImageIntoPost: `
      INSERT INTO post_images (url, post_id)
      VALUES (?, ?)
    `,

  //게시글 작성자 ID 조회
  getPostAuthorId: `
      SELECT user_id FROM posts WHERE id = ?
    `,

  //mvp 게시글 삽입
  insertMvp: `
      INSERT INTO mvp_posts (title, player_image, match_result, content, user_id)
      VALUES (?, ?, ?, ?, ?)
    `,

  //댓글 삽입
  insertComment: `
    INSERT INTO comments(post_id, user_id, content, parent_id)
    VALUES(?, ?, ?, ?)
    `,

  //댓글 조회
  getComments: `
    SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC
    `,

  //댓글 수정
  updateComment: `
    UPDATE comments SET content = ? WHERE id = ?
    `,

  // 댓글 삭제
  deleteComment: `
    DELETE FROM comments WHERE id = ?
    `,

  //댓글 id로 댓글 조회
  getCommentById: `
    SELECT * FROM comments WHERE id = ?
    `,

  // 게시글 수정
  updatePost: `
  UPDATE posts
  SET title = ?, match_result = ?, content = ?, user_id = ?, type = ?
  WHERE id = ?
  `,

  //mvp 게시글 수정
  updateMvp: `
  UPDATE mvp_posts
  SET title = ?, player_image = ?, match_result = ?, content = ?, user_id = ?
  WHERE id = ?
  `,

  // 게시글의 이미지 삭제
  deleteImagesFromPost: `
  DELETE FROM post_images WHERE post_id = ?
  `,

  //게시글 삭제
  deletePost: `
    DELETE FROM posts WHERE id = ?
    `,

  //좋아요 추가
  addLike: `
    INSERT INTO likes (user_id, post_id)
    VALUES(?, ?)
    ON DUPLICATE KEY UPDATE post_id = post_id
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
