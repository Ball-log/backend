import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ApiError } from "../../../../config/error";
import { status } from "../../../../config/response.status";
import { postS3PresignedUrlReqDto, postS3PresignedUrlResDto } from "../../../models/api-util/s3/s3.dto";
import { BaseApiResponse } from "../../../../config/response";
// S3 클라이언트 설정
const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_IAM_KEY as string,
        secretAccessKey: process.env.AWS_IAM_SECRET_KEY as string
    }
});


// Presigned URL 생성 함수
export const postS3PresignedUrlService = async (req: postS3PresignedUrlReqDto) => {
    let command: PutObjectCommand | DeleteObjectCommand;

    if (req.reqType === "put") {
        command = new PutObjectCommand({
            Bucket: "ballog",
            Key: `${req.fileLocation}/${req.fileName}`,
            ContentType: req.fileType
        });
    } else {
        command = new DeleteObjectCommand({
            Bucket: "ballog",
            Key: `${req.fileLocation}/${req.fileName}`
        });
    }

    try {
        // getSignedUrl 함수를 사용하여 presigned URL 생성
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 15 * 60 });
        const body: BaseApiResponse<postS3PresignedUrlResDto> = {
            ...status.SUCCESS.body,
            result: {
                presignedUrl
            }
        };
        return body;
    } catch (err) {
        // 에러 메시지 처리
        throw new ApiError(status.GENERATING_PRESIGNED_URL_ERROR);
    }
};
