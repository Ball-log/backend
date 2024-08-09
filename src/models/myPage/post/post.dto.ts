export interface getPostResDto {
    blog_list:
    {
        blog_id: number,
        blog_thumbnail: string,
        blog_title: string,
        blog_created_at: Date,
        blog_count_like: number,
        blog_count_comment: number
    }[],
    mvp_list:
    {
        mvp_id: number,
        mvp_thumbnail: string,
        mvp_player_name: string,
        mvp_player_record: string,
        mvp_created_at: Date,
        mvp_count_like: number,
        mvp_count_comment: number
    }[]
}
