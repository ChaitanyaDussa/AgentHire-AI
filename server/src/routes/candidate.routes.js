import { Router } from "express";
import * as controller from "../controllers/candidate.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { resumeUpload } from "../middleware/upload.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { candidateIdSchema, uploadCandidateSchema } from "../validators/candidate.validator.js";

const router = Router();

router.post("/upload", resumeUpload.single("resume"), validate(uploadCandidateSchema), asyncHandler(controller.upload));
router.get("/", requireAuth, asyncHandler(controller.list));
router.get("/:id", requireAuth, validate(candidateIdSchema), asyncHandler(controller.get));

export default router;
