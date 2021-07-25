import Sentiment from "sentiment";
const sentiment = new Sentiment();

const convertScore = (score: number) => {
	if (score < 0) {
		return 2;
	} else if (score > 0 && score < 0.16) {
		return 4;
	} else if (score >= 0.16) {
		return 5;
	}
	return 3;
};

const format = (text: string, splitter = "@") => {
	let formatted = text
		.split(splitter)
		.map((s) => s.trim())
		.filter((s) => s !== "");

	return formatted;
};

const evaluate = (sentence: string) => {
	let result = sentiment.analyze(sentence);
	let score = convertScore(result.comparative);
	return sentence + "@" + score;
};

const mainLogic = (text: string) => {
	let sentences = format(text);
	let data = sentences.map(evaluate);
	return data;
};

export { mainLogic };
