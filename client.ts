const inputSink = document.getElementsByClassName('controls-container')[0];
const logContainer = document.getElementsByClassName('log')[0];
const arrow = document.getElementsByClassName('arrow')[0];
const connectionStatus = document.getElementsByClassName('status')[0];
const title = document.querySelectorAll('.controls-header h1')[0];

let isConnected = false;
let touching = false;
let touchX: number;
let touchY: number;

function setConnected() {
  isConnected = true;
  connectionStatus.setAttribute('class', 'status connected');
}

function setDisconnected(error?: any) {
  isConnected = false;
  connectionStatus.setAttribute('class', 'status disconnected');
  if (error) log(`Error: ${JSON.stringify(error)}`, 'error');
  else log('Telecar Connection Lost', 'error');
}

title.addEventListener('click', e => window.location.reload(true));

inputSink.addEventListener('touchstart', e => {
  if (!isConnected) return;
  const touchEvent = e as TouchEvent;
  touching = true;
  touchX = touchEvent.touches[0].clientX;
  touchY = touchEvent.touches[0].clientY;
});

inputSink.addEventListener('touchmove', e => {
  e.preventDefault();
  if (!isConnected) return;
  if (!touching) return;

  const touchEvent = e as TouchEvent;
  const newX = touchEvent.touches[0].clientX;
  const newY = touchEvent.touches[0].clientY;

  const yDirection = newY < touchY ? 'forward' : 'back';
  const xOffset = Math.abs(newX - touchX);
  let xDirection: XDirection = null;
  if (xOffset > 30) xDirection = newX < touchX ? 'left' : 'right';
  setDirection(yDirection, xDirection);
  const size = Math.max(Math.max(Math.abs(newY - touchY), xOffset) * 4, 50);
  arrow.setAttribute('style', `font-size: ${size}%`);
});

inputSink.addEventListener('touchend', e => {
  if (!isConnected) return;
  touching = false;
  clearDirection();
});

type YDirection = 'forward' | 'back';
type XDirection = 'left' | 'right' | null;

function setDirection(y: YDirection, x: XDirection) {
  const description = `${y} ${x || ''}`;
  log(description);
  arrow.setAttribute('class', `arrow visible ${y} ${x}`);
  socket.send(description);
}

function clearDirection() {
  log('');
  arrow.setAttribute('class', 'arrow');
  socket.send('');
}

const socket = new WebSocket(
  `ws://${window.location.host.replace(`:${window.location.port}`, '')}:8090`
);
socket.onopen = () => {
  log('Connected to Telecar');
  setConnected();
};

socket.onclose = e => {
  setDisconnected();
};

socket.onerror = e => {
  setDisconnected(e);
};

window.scrollTo(0, 1);
log('Loaded');

type LogTypes = 'info' | 'error';
function log(text: string, type: LogTypes = 'info') {
  logContainer.innerHTML = text;
  logContainer.setAttribute('class', `log ${type}`);
}
