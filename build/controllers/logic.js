"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wholeText = exports.eachSentence = void 0;
const sentiment_1 = __importDefault(require("sentiment"));
const sentiment = new sentiment_1.default();
const eachSentence = (text) => {
    let sentences = text.split(".").filter((s) => s !== "");
    let data = sentences.map((sentence) => {
        return sentiment.analyze(sentence);
    });
    return data;
};
exports.eachSentence = eachSentence;
const wholeText = (text) => {
    return sentiment.analyze(text);
};
exports.wholeText = wholeText;
