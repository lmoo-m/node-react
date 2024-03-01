import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({
    credentials: {
        accessKeyId: "AKIAU6GDZ3T4BISUSK63",
        secretAccessKey: "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",
    },
    region: "us-east-2",
});

export const sendImage = async (bucket, nameObject, image) => {
    const resize = await sharp(image.buffer)
        .resize({
            width: 1080,
            height: 1920,
            fit: "contain",
            background: "rgba(0,0,0,.1)",
        })
        .toBuffer();

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: nameObject,
        Body: resize,
        ContentType: image.mimetype,
    });

    const result = await s3.send(command);
    return result;
};

export const deleteImage = async (bucket, nameObject) => {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: nameObject,
    });

    const result = await s3.send(command);
    return result;
};
