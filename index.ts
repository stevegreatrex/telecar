import { message } from './example';

async function doSomethingLater() {
  console.log('later');
}

doSomethingLater().then(() => console.log('after later'));

console.log(message);
