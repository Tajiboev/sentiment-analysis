import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import HTTPError from "./utils/httpError";
import router from "./router";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const app = express();

app.set("trust proxy", 1);
app.disable("etag");
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 2, // limit each IP to 100 requests per windowMs
});

const speedLimiter = slowDown({
	windowMs: 10 * 60 * 1000, // 10 minutes
	delayAfter: 2, // allow 100 requests per 10 minutes, then...
	delayMs: 500, // begin adding 500ms of delay per request above 100:
});

app.use(limiter);
app.use(speedLimiter);

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
