const express = require("express");
const session = require('express-session')
const http = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const momentTimezone = require("moment-timezone");
const moment = require("moment");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8001);
// Static folder
app.use(express.static(path.join(__dirname, "public"), { maxage: "7d" }));

// view engine
app.set('view engine', 'ejs');
app.use(cors());
app.set('trust proxy', 1); // trust first proxy
app.use(session({ secret: 'Secret_LOL', resave: false, saveUninitialized: true, cookie: { secure: true, maxAge: 60000 } }));

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }));
app.use(cookieParser('Secret_LOL'));


app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, safeFileNames: true, abortOnLimit: true }));

server.listen(app.get("port") || 8001, "127.0.0.1");

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`Port ${port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${port} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    };
};
const onListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe: ' + addr : 'port: ' + addr.port;
    console.log(`Server Listening on ${bind} process id: ${process.pid}`);
};

server.on('error', onError);
server.on('listening', onListening);