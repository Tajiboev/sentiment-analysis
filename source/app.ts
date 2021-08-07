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
	max: 20, // limit each IP to 20 requests per windowMs
});

const speedLimiter = slowDown({
	windowMs: 1 * 60 * 1000, // 1 minute
	delayAfter: 15, // allow 15 requests per 1 minute, then...
	delayMs: 500, // begin adding 500ms of delay per request above 100
});

app.use(limiter);
app.use(speedLimiter);

//route
app.use(router);

//healthcheck

app.get("/healthcheck", async (req, res) => {
	res.sendStatus(200);
});

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
