export interface alarmGetDto {
    id: number,
    post_id: number,
    post_type: string,
    post_user_id: string,
    message: string,
    created_at: string
}

export interface alarmPostDto {
    
    post_id: number,
    post_type: "blog" | "mvp" | "community"
    post_user_id: string,
    message: string
}

export interface alarmDeleteDto {
    id: number
}