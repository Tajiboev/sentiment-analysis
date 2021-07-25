import express from "express";
import { analyze } from "../controllers/analyze";
import methodError from "../middleware/methodError";
import validateBody from "../middleware/validateBody";
import { analyzeSchema } from "../utils/validationSchemas";
const router = express.Router();

router
	.route("/analyze")
	.post(validateBody(analyzeSchema), analyze)
	.all(methodError({ allowed: ["POST"] }));

export default router;
