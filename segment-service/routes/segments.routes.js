import {Router} from "express";
import { evaluateSegmentRules } from "../controllers/segments.controller.js";

const router = Router();
router.post("/evaluate", evaluateSegmentRules);

export default router;
