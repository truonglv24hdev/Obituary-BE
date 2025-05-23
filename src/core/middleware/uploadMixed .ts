import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import fs from "fs";

const dynamicStorage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const videoTypes = ["video/mp4", "video/mkv", "video/webm"];
    const folder = videoTypes.includes(file.mimetype)
      ? "public/videos"
      : "public/uploads";

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const allowed = [
  "video/mp4",
  "video/mkv",
  "video/webm",
  "image/jpeg",
  "image/png",
];

export function uploadMixed(fields: { name: string; maxCount: number }[]) {
  return multer({
    storage: dynamicStorage,
    fileFilter: function (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) {
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("File type not allowed"));
      }
    },
  }).fields(fields);
}
export default uploadMixed;
