import pm2 from "pm2";

pm2.connect(function (err) {
	if (err) {
		console.error(err);
		process.exit(2);
	}

	pm2.start(
		{
			script: "build/server.js",
			name: "api",
			exec_mode: "cluster",
			instances: -1,
		},
		function (err, apps) {
			if (err) {
				console.error(err);
				return pm2.disconnect();
			}

			pm2.list((err, list) => {
				if (err) console.error(err);

				pm2.restart("api", (err, proc) => {
					// Disconnects from PM2
					pm2.disconnect();
				});
			});
		}
	);
});
