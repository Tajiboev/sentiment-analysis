"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLogic = void 0;
const sentiment_1 = __importDefault(require("sentiment"));
const sentiment = new sentiment_1.default();
const format = (text, splitter) => {
    let formatted = text
        .split(splitter)
        .map((s) => s.trim())
        .filter((s) => s !== "");
    return formatted;
};
const evaluate = (sentence) => {
    let result = sentiment.analyze(sentence);
    return {
        sentence,
        score: result.score,
        comparative: result.comparative,
    };
};
const mainLogic = (text, splitter = ".") => {
    let sentences = format(text, splitter);
    let data = sentences.map(evaluate);
    return data;
};
exports.mainLogic = mainLogic;
