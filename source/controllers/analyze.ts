import { NextFunction, Request, Response } from "express";
import HTTPError from "../utils/httpError";
import { eachSentence, wholeText } from "./logic";

const analyze = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text } = req.body;
		if (!text) throw new HTTPError("Empty text", 400);
		let bySentence = eachSentence(text);
		let overall = wholeText(text);
		res.status(200).json({ bySentence, overall });
	} catch (error) {
		next(error);
	}
};

export { analyze };
