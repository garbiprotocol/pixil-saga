const http = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
/**
 * Get port from environment and store in Express.
 */
app.use(express.static(__dirname));

app.use(function (req, res, next) {
    //   res.header('Access-Control-Allow-Origin', "*");
    //   res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const port = 5055;
app.set('const', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) return val; // named pipe
    if (port >= 0) return port; // port number
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind);
}
