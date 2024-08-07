export interface PostDto {
  id: string; // 게시글 ID
  title: string; // 제목
  matchResult?: string; // 경기 결과 (선택적)
  content: string; // 본문 내용
  createdAt: Date; // 생성 날짜
  userId: string; // 작성자 ID
  type: string; // 'blog' | 'mvp'
}

export interface ImageDto {
  id: string; // 이미지 ID
  postId: string; // 관련된 게시글 ID
  url: string; // 이미지 URL
}

export interface MvpDto {
  id: string; // MVP 게시글 ID
  title: string; // 제목
  playerImage: string; // 선수 이미지 URL
  matchResult: string; // 경기 결과
  content: string; // 본문 내용
  userId: string; // 작성자 ID
}

export interface CommentDto {
  id: string; // 댓글 id
  postId: string; // 게시글 id
  userId: string; // 작성자 id
  content: string; // 댓글 내용
  createdAt: Date; // 작성 날짜
}

export interface LikeDto {
  userId: string; // 사용자 id
  postId: string; // 게시글 id
}
