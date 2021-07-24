import { NextFunction, Request, Response } from "express";
import HTTPError from "../utils/httpError";

const analyze = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { text } = req.body;
		res.status(200).json({
			message: "OK",
		});
	} catch (error) {
		next(error);
	}
};

export { analyze };
