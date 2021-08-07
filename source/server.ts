import { createServer } from "http";
import app from "./app";
import log from "./log";

const start = async () => {
	try {
		log.info("Starting server");
		const port = process.env.PORT || 5000;
		const server = createServer(app);
		server.listen(port, () => {
			log.info(`Server listening on port ${port}`);
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
