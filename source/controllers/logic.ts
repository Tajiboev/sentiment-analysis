import Sentiment from "sentiment";
const sentiment = new Sentiment();

const bySentence = (text: string) => {
	let sentences = text.split(".").filter((s) => s !== "");

	let data = sentences.map((sentence) => {
		let result = sentiment.analyze(sentence);
		let converted = convertScore(result.comparative);
		return {
			sentence,
			converted,
			...result,
			comparative: Math.round(result.comparative * 100) / 100,
		};
	});

	return data;
};

const overall = (text: string) => {
	let result = sentiment.analyze(text);
	let converted = convertScore(result.comparative);
	return {
		text,
		converted,
		...result,
		comparative: Math.round(result.comparative * 100)/100
	};
};

const convertScore = (score: number): number => {
	let num = (100 + score * 20) / 2;
	return Math.round(num * 100) / 100;
};

export { bySentence, overall };
