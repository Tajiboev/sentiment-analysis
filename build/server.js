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
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const log_1 = __importDefault(require("./log"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        log_1.default.info("Starting server");
        const port = process.env.PORT || 5000;
        const server = http_1.createServer(app_1.default);
        server.listen(port, () => {
            log_1.default.info(`Server listening on port ${port}`);
        });
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
start();
