import Sentiment from "sentiment";
const sentiment = new Sentiment();

const eachSentence = (text: string) => {
	let sentences = text.split(".").filter((s) => s !== "");

	let data = sentences.map((sentence) => {
		return sentiment.analyze(sentence);
	});

	return data;
};

const wholeText = (text: string) => {
	return sentiment.analyze(text);
};

export { eachSentence, wholeText };
