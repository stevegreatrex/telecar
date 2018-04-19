"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GO = 0;
exports.STOP = 1;
class CarState {
    constructor(direction) {
        this.forward = false;
        this.back = false;
        this.left = false;
        this.right = false;
        switch (direction) {
            case 'forward': {
                this.forward = true;
                break;
            }
            case 'forward left': {
                this.forward = true;
                this.left = true;
                break;
            }
            case 'forward right': {
                this.forward = true;
                this.right = true;
                break;
            }
            case 'back': {
                this.back = true;
                break;
            }
            case 'back left': {
                this.back = true;
                this.left = true;
                break;
            }
            case 'back right': {
                this.back = true;
                this.right = true;
            }
        }
    }
    diffCommand(oldState) {
        let command = '';
        if (oldState.forward !== this.forward)
            command = `gpio write 27 ${oldState.forward ? exports.STOP : exports.GO}`;
        if (oldState.back !== this.back)
            command =
                (command.length ? ' && ' : '') +
                    `gpio write 1 ${oldState.back ? exports.STOP : exports.GO}`;
        if (oldState.left !== this.left)
            command =
                (command.length ? ' && ' : '') +
                    `gpio write 6 ${oldState.left ? exports.STOP : exports.GO}`;
        if (oldState.right !== this.right)
            command =
                (command.length ? ' && ' : '') +
                    `gpio write 26 ${oldState.right ? exports.STOP : exports.GO}`;
    }
    toString() {
        return `F:${this.forward} B: ${this.back} L: ${this.left} R: ${this.right}`;
    }
}
exports.CarState = CarState;
