import { createServer } from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { Server } from 'ws';
import { exec } from 'child_process';
import { CarState } from './CarState';

const port = 8080;

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

server.listen(port, (err: any) => {
  if (err) console.error('Error on startup', err);
  else console.log(`Server is listening on ${port}`);
});

const socketServer = new Server({ port: 8090 });
let currentState = new CarState();
socketServer.on('connection', ws => {
  ws.on('message', async (direction: string) => {
    const newState = new CarState(direction);
    console.log(`Update: ${currentState.toString()} -> ${newState.toString()}`);
    const command = newState.diffCommand(currentState);
    currentState = newState;
    if (command) {
      console.log(`    ${command}`);
      await asyncExec(command);
    }
  });
});

const asyncExec = (command: string) =>
  new Promise((resolve, reject) => {
    console.log(`Executing ${command}`);
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
      } else if (stderr) {
        console.error(stderr);
        reject(stderr);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });

const initGpio = async () => {
  await asyncExec('gpio mode 1 out');
  await asyncExec('gpio mode 6 out');
  await asyncExec('gpio mode 26 out');
  await asyncExec('gpio mode 27 out');
};

initGpio();

const commands: { [key: string]: string[] } = {};
