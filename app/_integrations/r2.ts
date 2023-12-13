"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

import { zact } from "~/app/_zact/server";
import { env } from "~/app/env.mjs";

const fileSchema = z.object({
  fileName: z.string(),
});

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.S3_UPLOAD_KEY,
    secretAccessKey: env.S3_UPLOAD_SECRET,
  },
});

// FIXME: move to an actions file, perhaps in the proper location for mentors/wherever we need this.
//        It breaks the convention to have "use server" in a file, not called `actions.ts`
export const uploadFile = zact(fileSchema)(async (input) => {
  const preSignedUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: env.S3_UPLOAD_BUCKET,
      Key: input.fileName,
    }),
    {
      expiresIn: 3600,
    },
  );
  return {
    url: preSignedUrl,
  };
});

export const getImageUrl = zact(fileSchema)(async (input) => {
  const url = `${env.R2_ACCESS_URL}/${input.fileName}`;
  return url;
});
