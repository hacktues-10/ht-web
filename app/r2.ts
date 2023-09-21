"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { zact } from "zact/server";
import { z } from "zod";

import { env } from "~/app/env.mjs";

const fileSchema = z.object({
  fileName: z.string(),
});

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.S3_UPLOAD_KEY,
    secretAccessKey: env.S3_UPLOAD_SECRET,
  },
});

`https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
export const uploadFile = zact(fileSchema)(async (input) => {
  const preSignedUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: env.S3_UPLOAD_BUCKET,
      Key: input.fileName,
    }),
    {
      expiresIn: 3600,
    },
  );
  console.log(preSignedUrl);
  return {
    url: preSignedUrl,
  };
});

export const getImageUrl = zact(fileSchema)(async (input) => {
  const url = `${env.R2_ACCESS_URL}/${input.fileName}`;
  return url;
});
