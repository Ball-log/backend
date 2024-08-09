export interface postS3PresignedUrlReqDto {
    fileName: string,
    fileLocation: "icon" | "background" | "player" | "post",
    fileType: string,
    reqType: "put" | "delete"
}

export interface postS3PresignedUrlResDto {
    presignedUrl: string
}
