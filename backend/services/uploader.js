// // services/uploader.js
// import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";
// import fs from "fs";

// dotenv.config();

// export const s3 = new S3Client({
//     endpoint: process.env.DO_SPACES_ENDPOINT,
//     region: process.env.DO_SPACES_REGION,
//     forcePathStyle: false, 
//     credentials: {
//         accessKeyId: process.env.DO_SPACES_KEY,
//         secretAccessKey: process.env.DO_SPACES_SECRET,
//     },
// });

// /**
//  * Upload file buffer or filepath to DO Spaces
//  * Supports fileStream from Multer
//  */
// export async function uploadToSpaces({ fileStream, remoteFileName, contentType }) {
//     const params = {
//         Bucket: process.env.DO_SPACES_NAME,
//         Key: remoteFileName,
//         Body: fileStream,
//         ACL: "public-read",
//         ContentType: contentType,
//     };

//     try {
//         const command = new PutObjectCommand(params);
//         await s3.send(command);

//         // Public URL format for DO Spaces
//         const fileUrl = `https://${process.env.DO_SPACES_NAME}.${process.env.DO_SPACES_CDN}/${remoteFileName}`;

//         return {
//             fileUrl,
//             key: remoteFileName,
//         };

//     } catch (error) {
//         console.error("Error uploading:", error);
//         throw new Error("File upload failed");
//     }
// }

// /**
//  * Delete file from DO Spaces
//  */
// export async function deleteFromSpaces(key) {
//     try {
//         const params = {
//             Bucket: process.env.DO_SPACES_NAME,
//             Key: key,
//         };
//         const command = new DeleteObjectCommand(params);
//         await s3.send(command);
//         return true;
//     } catch (error) {
//         console.error("Delete error:", error);
//         return false;
//     }
// }

// backend/services/uploader.js (CommonJS version)

// const { 
//   S3Client, 
//   PutObjectCommand, 
//   DeleteObjectCommand 
// } = require("@aws-sdk/client-s3");

// require("dotenv").config();

// const s3 = new S3Client({
//   endpoint: process.env.DO_SPACES_ENDPOINT,
//   region: process.env.DO_SPACES_REGION,
//   forcePathStyle: false,
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_KEY,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

// exports.uploadToSpaces = async ({ fileStream, remoteFileName, contentType }) => {
//   const params = {
//     Bucket: process.env.DO_SPACES_NAME,
//     Key: remoteFileName,
//     Body: fileStream,
//     ACL: "public-read",
//     ContentType: contentType,
//   };

//   const command = new PutObjectCommand(params);
//   await s3.send(command);

//   const fileUrl = `https://${process.env.DO_SPACES_NAME}.${process.env.DO_SPACES_CDN}/${remoteFileName}`;

//   return {
//     fileUrl,
//     key: remoteFileName,
//   };
// };

// exports.deleteFromSpaces = async (key) => {
//   try {
//     const command = new DeleteObjectCommand({
//       Bucket: process.env.DO_SPACES_NAME,
//       Key: key,
//     });

//     await s3.send(command);
//     return true;
//   } catch (error) {
//     console.error("Delete error:", error);
//     return false;
//   }
// };


// const {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand,
// } = require("@aws-sdk/client-s3");

// require("dotenv").config();

// const s3 = new S3Client({
//   region: process.env.DO_SPACES_REGION,
//   endpoint: process.env.DO_SPACES_ENDPOINT, // https://blr1.digitaloceanspaces.com
//   forcePathStyle: false,
//   credentials: {
//     accessKeyId: process.env.DO_SPACES_KEY,
//     secretAccessKey: process.env.DO_SPACES_SECRET,
//   },
// });

// exports.uploadToSpaces = async (file) => {
//   const remoteFileName = `albums/${Date.now()}-${file.originalname}`;

//   const params = {
//     Bucket: process.env.DO_SPACES_NAME,
//     Key: remoteFileName,
//     Body: file.buffer,               // IMPORTANT ✔
//     ACL: "public-read",
//     ContentType: file.mimetype,
//   };

//   const command = new PutObjectCommand(params);
//   await s3.send(command);

//   // Build CDN URL (public)
//   const fileUrl = `https://${process.env.DO_SPACES_NAME}.${process.env.DO_SPACES_CDN}/${remoteFileName}`;

//   return {
//     fileUrl,
//     key: remoteFileName,
//   };
// };

// exports.deleteFromSpaces = async (key) => {
//   try {
//     const command = new DeleteObjectCommand({
//       Bucket: process.env.DO_SPACES_NAME,
//       Key: key,
//     });

//     await s3.send(command);
//     return true;
//   } catch (error) {
//     console.error("Delete error:", error);
//     return false;
//   }
// };

// services/uploader.js

const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

require("dotenv").config();

const s3 = new S3Client({
  region: process.env.DO_SPACES_REGION,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

// =========================
// UPLOAD
// =========================
exports.uploadToSpaces = async (file) => {
  try {
    if (!file) throw new Error("File is required");

    const remoteFileName = `albums/${file.originalname}`;

    const params = {
      Bucket: process.env.DO_SPACES_NAME,
      Key: remoteFileName,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    // Build final URL
    const cdn = process.env.DO_SPACES_CDN; // MUST include https://
    const region = process.env.DO_SPACES_REGION;
    const bucket = process.env.DO_SPACES_NAME;

    let fileUrl = cdn
      ? `${cdn}/${remoteFileName}`
      : `https://${bucket}.${region}.digitaloceanspaces.com/${remoteFileName}`;

    return fileUrl;
  } catch (err) {
    console.error("Upload error:", err);
    throw new Error("Upload failed");
  }
};

// =========================
// DELETE
// =========================
exports.deleteFromSpaces = async (fileKey) => {
  try {
    if (!fileKey) throw new Error("fileKey is required");

    const params = {
      Bucket: process.env.DO_SPACES_NAME,
      Key: fileKey,
    };

    await s3.send(new DeleteObjectCommand(params));
    return true;
  } catch (err) {
    console.error("Delete error:", err);
    return false;
  }
};
