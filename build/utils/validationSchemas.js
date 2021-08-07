"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const analyzeSchema = joi_1.default.object({
    text: joi_1.default.string().required(),
    split: joi_1.default.boolean().sensitive(false).required(),
}).strict();
exports.analyzeSchema = analyzeSchema;
