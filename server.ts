import { createServer } from 'http';

const port = 8080;

const server = createServer((request, response) => {
  response.end('Hello world');
});

server.listen(port, (err: any) => {
  if (err) console.error('Error on startup', err);
  else console.log(`Server is listening on ${port}`);
});
