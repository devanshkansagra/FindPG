import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadFile(fileBuffer, fileName, mimeType) {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimeType,
  };

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export async function getFile(key) {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
}

export async function deleteFile(fileName) {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}
