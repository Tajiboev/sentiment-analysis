import { NextFunction, Request, Response } from "express";
import { mainLogic } from "./logic";

const analyze = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text, splitter } = req.body;
		let result = mainLogic(text, splitter);
		res.status(200).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export { analyze };
