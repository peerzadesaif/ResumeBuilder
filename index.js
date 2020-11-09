const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const momentTimezone = require("moment-timezone");
const moment = require("moment");


const app = express();
const server = http.createServer(app);
console.log("Running")

const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe: ' + addr : 'port: ' + addr.port;
    console.log(`Server Listening on ${bind} process id: ${process.pid}`);
};
server.listen(8001, "127.0.0.1")
// server.on('error', onError);
server.on('listening', onListening);