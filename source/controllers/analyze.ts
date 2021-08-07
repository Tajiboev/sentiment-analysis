import { NextFunction, Request, Response } from "express";
import { bySentence, overall } from "./logic";

const analyze = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text, split } = req.body;
		if (!split) {
			let result = overall(text);
			res.status(200).json(result);
		} else {
			let result = bySentence(text);
			res.status(200).json(result);
		}
	} catch (error) {
		next(error);
	}
};

export { analyze };
