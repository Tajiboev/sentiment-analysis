import { createServer } from "http";
import app from "./app";

const start = async () => {
	try {
		console.log("Starting server");
		const port = process.env.PORT || 5000;
		const server = createServer(app);
		server.listen(port, () => {
			console.info(`Server listening on port ${port}`);
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
