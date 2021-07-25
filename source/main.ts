import path from "path";
import fs from "fs";

var Sentiment = require("sentiment");
var sentiment = new Sentiment();

const directoryPath = path.join(__dirname, "../FOMC2017-2019");

fs.readdir(directoryPath, function (err, files) {
	if (err) {
		return console.log("Unable to scan directory: " + err);
	}

	files.forEach(function (file) {
		cb(file);
	});
});

const cb = (fileName: string) => {
	let filePath = path.join(__dirname, "../FOMC2017-2019", fileName);
	let text = fs.readFileSync(filePath).toString();
	let sentences = text
		.split("@")
		.map((s) => s.trim())
		.filter((s) => s !== "");

	let data = sentences
		.map((s) => {
			let sr = sentiment.analyze(s);
			return s + "@" + rate(sr.comparative);
		})
		.join("\n");

	let savepath = path.join(__dirname, `done-${fileName}`);
	fs.writeFile(savepath, data, (err) => {
		if (err) return console.error("error writing file");
	});
};

const rate = (score: number) => {
	console.log(score);
	if (score < 0) {
		return 2;
	} else if (score === 0) {
		return 3;
	} else if (score > 0 && score < 0.15) {
		return 4;
	} else if (score >= 0.15) {
		return 5;
	}
};
