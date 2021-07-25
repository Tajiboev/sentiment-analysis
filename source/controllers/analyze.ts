import { NextFunction, Request, Response } from "express";
import { mainLogic } from "./logic";

const analyze = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text } = req.body;
		let result = mainLogic(text);
		res.status(200).json({
			result,
		});
	} catch (error) {
		next(error);
	}
};

export { analyze };
