import { createServer } from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { Server } from 'ws';
import { exec } from 'child_process';
import { CarState } from './CarState';
import { InitCommand } from './InitCommand';
import { ICommand } from './ICommand';
import { MoveCommand } from './MoveCommand';
import * as colors from 'colors/safe';

const httpPort = 8080;
const wsPort = 8090;

const server = createServer((request, response) => {
  const uri = url.parse(request.url!).pathname;
  let filename = path.join(process.cwd(), uri!);

  fs.exists(filename, exists => {
    if (!exists) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, 'binary', function(err, file) {
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

server.listen(httpPort, (err: any) => {
  if (err) error('Error on startup', err);
  else log(`Server is listening on ${httpPort}`);
});

const socketServer = new Server({ port: 8090 });
let currentState = new CarState();
socketServer.on('connection', ws => {
  ws.on('message', async (direction: string) => {
    const newState = new CarState(direction);
    const command = new MoveCommand(currentState, newState);
    if (!command.commandString) return;
    currentState = newState;
    if (command) await asyncExec(command);
  });
});

const asyncExec = (command: ICommand) =>
  new Promise((resolve, reject) => {
    log(`${command.debugInfo} ${command.commandString}`);
    exec(command.commandString, (err, stdout, stderr) => {
      if (err) {
        error(err);
        reject(err);
      } else if (stderr) {
        error(stderr);
        reject(stderr);
      } else {
        log(stdout);
        resolve();
      }
    });
  });

asyncExec(new InitCommand());

function log(message: any) {
  console.log(`${colors.gray(new Date().toISOString())} ${message}`);
}

function error(message: any, err?: any) {
  log(`${colors.red(message)} {err}`);
}

const commands: { [key: string]: string[] } = {};
