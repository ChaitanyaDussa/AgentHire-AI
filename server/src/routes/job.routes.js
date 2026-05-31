import { Router } from "express";
import * as controller from "../controllers/job.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createJobSchema, jobIdSchema } from "../validators/job.validator.js";

const router = Router();

router.post("/", requireAuth, validate(createJobSchema), asyncHandler(controller.create));
router.get("/", asyncHandler(controller.list));
router.get("/:id", validate(jobIdSchema), asyncHandler(controller.get));
router.put("/:id", requireAuth, validate(jobIdSchema), asyncHandler(controller.update));

export default router;
