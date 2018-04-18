const inputSink = document.getElementsByClassName('controls-container')[0];
const log = document.getElementsByClassName('log')[0];
const arrow = document.getElementsByClassName('arrow')[0];

let connected = false;
let touching = false;
let touchX: number;
let touchY: number;

inputSink.addEventListener('touchstart', e => {
  if (!connected) return;
  const touchEvent = e as TouchEvent;
  touching = true;
  touchX = touchEvent.touches[0].clientX;
  touchY = touchEvent.touches[0].clientY;
});

inputSink.addEventListener('touchmove', e => {
  if (!connected) return;
  if (!touching) return;

  const touchEvent = e as TouchEvent;
  const newX = touchEvent.touches[0].clientX;
  const newY = touchEvent.touches[0].clientY;

  const yDirection = newY < touchY ? 'forward' : 'back';
  const xOffset = Math.abs(newX - touchX);
  let xDirection: XDirection = null;
  if (xOffset > 30) xDirection = newX < touchX ? 'left' : 'right';
  setDirection(yDirection, xDirection);
});

inputSink.addEventListener('touchend', e => {
  if (!connected) return;
  touching = false;
  clearDirection();
});

type YDirection = 'forward' | 'back';
type XDirection = 'left' | 'right' | null;

function setDirection(y: YDirection, x: XDirection) {
  const description = `${y} ${x || ''}`;
  log.innerHTML = description;
  arrow.setAttribute('class', `arrow visible ${y} ${x}`);
  socket.send(description);
}

function clearDirection() {
  log.innerHTML = '';
  arrow.setAttribute('class', 'arrow');
}

const socket = new WebSocket('ws://localhost:8090');
socket.onopen = () => {
  log.innerHTML = 'Connected';
  connected = true;
};
