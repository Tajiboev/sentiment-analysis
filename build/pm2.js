"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pm2_1 = __importDefault(require("pm2"));
pm2_1.default.connect(function (err) {
    if (err) {
        console.error(err);
        process.exit(2);
    }
    pm2_1.default.start({
        script: "build/server.js",
        name: "api",
        exec_mode: "cluster",
        instances: -1,
    }, function (err, apps) {
        if (err) {
            console.error(err);
            return pm2_1.default.disconnect();
        }
        pm2_1.default.list((err, list) => {
            if (err)
                console.error(err);
            pm2_1.default.restart("api", (err, proc) => {
                pm2_1.default.disconnect();
            });
        });
    });
});
