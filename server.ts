import { createServer } from 'http';
import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import { Server } from 'ws';
import { exec } from 'child_process';

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
let currentDirection: string;
socketServer.on('connection', ws => {
  ws.on('message', async (direction: string) => {
    console.log(`Incoming: ${direction}`);
    //stop everything
    // await asyncExec('gpio write 27 1');
    // await asyncExec('gpio write 1 1');
    // await asyncExec('gpio write 6 1');
    // await asyncExec('gpio write 26 1');

    if (commands[direction]) {
      for (const command in commands[direction]) await asyncExec(command);
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

const commands: { [key: string]: string[] } = {
  forward: ['gpio write 27 0'],
  'forward left': ['gpio write 27 0', 'gpio write 6 0'],
  'forward right': ['gpio write 27 0', 'gpio write 26 0'],
  back: ['gpio write 1 0'],
  'back left': ['gpio write 1 0', 'gpio write 6 0'],
  'back right': ['gpio write 1 0', 'gpio write 26 0']
};
