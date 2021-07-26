import Sentiment from "sentiment";
const sentiment = new Sentiment();

const format = (text: string, splitter: string) => {
	let formatted = text
		.split(splitter)
		.map((s) => s.trim())
		.filter((s) => s !== "");

	return formatted;
};

const evaluate = (sentence: string) => {
	let result = sentiment.analyze(sentence);
	return {
		sentence,
		score: result.score,
		comparative: result.comparative,
	};
};

const mainLogic = (text: string, splitter = ".") => {
	let sentences = format(text, splitter);
	let data = sentences.map(evaluate);
	return data;
};

export { mainLogic };
