"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyze_1 = require("../controllers/analyze");
const methodError_1 = __importDefault(require("../middleware/methodError"));
const validateBody_1 = __importDefault(require("../middleware/validateBody"));
const validationSchemas_1 = require("../utils/validationSchemas");
const router = express_1.default.Router();
router
    .route("/analyze")
    .post(validateBody_1.default(validationSchemas_1.analyzeSchema), analyze_1.analyze)
    .all(methodError_1.default({ allowed: ["POST"] }));
exports.default = router;
