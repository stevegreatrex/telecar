"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const port = 8080;
const server = http_1.createServer((request, response) => {
    const uri = url.parse(request.url).pathname;
    let filename = path.join(process.cwd(), uri);
    fs.exists(filename, exists => {
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found\n');
            response.end();
            return;
        }
        if (fs.statSync(filename).isDirectory())
            filename += '/index.html';
        fs.readFile(filename, 'binary', function (err, file) {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.write(err + '\n');
                response.end();
                return;
            }
            response.writeHead(200);
            response.write(file, 'binary');
            response.end();
        });
    });
});
server.listen(port, (err) => {
    if (err)
        console.error('Error on startup', err);
    else
        console.log(`Server is listening on ${port}`);
});
