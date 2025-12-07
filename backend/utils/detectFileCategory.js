export function detectFileCategory(mimeType) {
  if (!mimeType) return "UNKNOWN";

  const type = mimeType.toLowerCase();

  if (type.startsWith("image/") && !type.includes("gif")) return "PHOTO";
  if (type === "image/gif") return "GIF";

  if (type.startsWith("video/")) return "VIDEO";
  if (type.startsWith("audio/")) return "AUDIO";
  if (type === "application/pdf") return "PDF";

  const documentTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];

  if (documentTypes.includes(type)) return "DOCUMENT";

  const archiveTypes = [
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
    "application/gzip",
    "application/x-tar",
  ];

  if (archiveTypes.includes(type)) return "ARCHIVE";

  return "UNKNOWN";
};
