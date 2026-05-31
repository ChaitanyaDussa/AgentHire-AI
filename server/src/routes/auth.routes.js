import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginSchema, signupSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(controller.signup));
router.post("/login", validate(loginSchema), asyncHandler(controller.login));
router.get("/me", requireAuth, asyncHandler(controller.me));

export default router;
