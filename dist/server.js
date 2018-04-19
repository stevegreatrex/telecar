"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const ws_1 = require("ws");
const child_process_1 = require("child_process");
const CarState_1 = require("./CarState");
const InitCommand_1 = require("./InitCommand");
const MoveCommand_1 = require("./MoveCommand");
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
const socketServer = new ws_1.Server({ port: 8090 });
let currentState = new CarState_1.CarState();
socketServer.on('connection', ws => {
    ws.on('message', (direction) => __awaiter(this, void 0, void 0, function* () {
        const newState = new CarState_1.CarState(direction);
        const command = new MoveCommand_1.MoveCommand(currentState, newState);
        if (!command.commandString)
            return;
        currentState = newState;
        if (command)
            yield asyncExec(command);
    }));
});
const asyncExec = (command) => new Promise((resolve, reject) => {
    console.log(`${command.debugInfo} ${command.commandString}`);
    child_process_1.exec(command.commandString, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            reject(err);
        }
        else if (stderr) {
            console.error(stderr);
            reject(stderr);
        }
        else {
            console.log(stdout);
            resolve();
        }
    });
});
asyncExec(new InitCommand_1.InitCommand());
const commands = {};
