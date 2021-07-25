import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import HTTPError from "./utils/httpError";
import router from "./router";

const app = express();

app.disable("etag");
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route
app.use(router);

//errors
app.use(async (req: Request, res: Response, next: NextFunction) => {
	next(new HTTPError("Not found", 404));
});

app.use(async (error: HTTPError, req: Request, res: Response, next: NextFunction) => {
	res.status(error.statusCode || 500).json({
		error: {
			statusCode: error.statusCode,
			message: error.message,
		},
	});
});

export default app;
