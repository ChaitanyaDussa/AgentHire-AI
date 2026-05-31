import multer from "multer";
import path from "path";
import { uploadsDir } from "../config/paths.js";

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9.-]/gi, "_").toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  }
});

export const resumeUpload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF resumes are allowed"));
    }
    return cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});
