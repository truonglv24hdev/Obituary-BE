import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import streamifier from 'streamifier';

// Cấu hình Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME || "dowtsdg7h", 
  api_key: process.env.API_KEY || "856547751684482", 
  api_secret: process.env.API_SECRET || "tLo59woA-krx-uPwFK0CRK2sHi4" 
});

interface CloudinaryResult {
  url: string;
  [key: string]: any;
}

// Middleware upload nhiều ảnh
const uploadMultiple = (req: Request, res: Response, next: NextFunction) => {
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const uploadPromises = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => {
      return new Promise<CloudinaryResult>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) resolve(result as CloudinaryResult);
          else reject(error);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    Promise.all(uploadPromises)
      .then(results => {
        req.body.uploadedUrls = results.map((r: CloudinaryResult) => r.url);
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
};

export default uploadMultiple;
