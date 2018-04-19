"use strict";
const inputSink = document.getElementsByClassName('controls-container')[0];
const logContainer = document.getElementsByClassName('log')[0];
const arrow = document.getElementsByClassName('arrow')[0];
const connectionStatus = document.getElementsByClassName('status')[0];
let isConnected = false;
let touching = false;
let touchX;
let touchY;
function setConnected() {
    isConnected = true;
    connectionStatus.setAttribute('class', 'status connected');
}
function setDisconnected(error) {
    isConnected = false;
    connectionStatus.setAttribute('class', 'status disconnected');
    if (error)
        log(`Error: ${JSON.stringify(error)}`, 'error');
    else
        log('Telecar Connection Lost', 'error');
}
inputSink.addEventListener('touchstart', e => {
    if (!isConnected)
        return;
    const touchEvent = e;
    touching = true;
    touchX = touchEvent.touches[0].clientX;
    touchY = touchEvent.touches[0].clientY;
});
inputSink.addEventListener('touchmove', e => {
    if (!isConnected)
        return;
    if (!touching)
        return;
    const touchEvent = e;
    const newX = touchEvent.touches[0].clientX;
    const newY = touchEvent.touches[0].clientY;
    const yDirection = newY < touchY ? 'forward' : 'back';
    const xOffset = Math.abs(newX - touchX);
    let xDirection = null;
    if (xOffset > 30)
        xDirection = newX < touchX ? 'left' : 'right';
    setDirection(yDirection, xDirection);
    const size = Math.max(Math.max(Math.abs(newY - touchY), xOffset) * 4, 50);
    arrow.setAttribute('style', `font-size: ${size}%`);
});
inputSink.addEventListener('touchend', e => {
    if (!isConnected)
        return;
    touching = false;
    clearDirection();
});
function setDirection(y, x) {
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
const socket = new WebSocket(`ws://${window.location.host.replace(`:${window.location.port}`, '')}:8090`);
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
log('Loaded');
function log(text, type = 'info') {
    logContainer.innerHTML = text;
    logContainer.setAttribute('class', `log ${type}`);
}
