"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const httpError_1 = __importDefault(require("./utils/httpError"));
const router_1 = __importDefault(require("./router"));
const app = express_1.default();
app.disable("etag");
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(compression_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(router_1.default);
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(new httpError_1.default("Not found", 404));
}));
app.use((error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(error.statusCode || 500).json({
        error: {
            statusCode: error.statusCode,
            message: error.message,
        },
    });
}));
exports.default = app;
