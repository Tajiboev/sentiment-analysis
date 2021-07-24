import { NextFunction, Request, Response } from "express";
import { Schema, ValidationError, ValidationResult } from "joi";
import HTTPError from "../utils/httpError";

const validateBody = (schema: Schema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		schema
			.validateAsync(req.body)
			.then((value: ValidationResult) => {
				if (value) next();
			})
			.catch((e: ValidationError) => {
				next(new HTTPError(e.message, 400));
			});
	};
};

export default validateBody;
