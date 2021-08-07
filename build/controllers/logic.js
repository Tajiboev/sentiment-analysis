"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overall = exports.bySentence = void 0;
const sentiment_1 = __importDefault(require("sentiment"));
const sentiment = new sentiment_1.default();
const bySentence = (text) => {
    let sentences = text.split(".").filter((s) => s !== "");
    let data = sentences.map((sentence) => {
        let result = sentiment.analyze(sentence);
        let converted = convertScore(result.comparative);
        return Object.assign({ sentence,
            converted }, result);
    });
    return data;
};
exports.bySentence = bySentence;
const overall = (text) => {
    let result = sentiment.analyze(text);
    let converted = convertScore(result.comparative);
    return Object.assign({ text,
        converted }, result);
};
exports.overall = overall;
const convertScore = (score) => {
    let num = (100 + score * 20) / 2;
    return Math.round(num * 100) / 100;
};
