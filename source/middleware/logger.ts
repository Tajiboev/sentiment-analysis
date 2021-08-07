import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import log from "../log";

const logger = (req: Request, res: Response, next: NextFunction) => {
	let id = nanoid(8);
	log.info(`[Request] - requestId: ${id}, method: ${req.method}, url: ${req.url}`);
	res.on("finish", () => {
		log.info(
			`[Response] - requestId: ${id}, method: ${req.method}, url: ${req.url}, status: ${res.statusCode}`
		);
	});
	next();
};

export default logger;
