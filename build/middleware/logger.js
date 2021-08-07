"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const log_1 = __importDefault(require("../log"));
const logger = (req, res, next) => {
    let id = nanoid_1.nanoid(8);
    log_1.default.info(`[Request] - requestId: ${id}, method: ${req.method}, url: ${req.url}`);
    res.on("finish", () => {
        log_1.default.info(`[Response] - requestId: ${id}, method: ${req.method}, url: ${req.url}, status: ${res.statusCode}`);
    });
    next();
};
exports.default = logger;
