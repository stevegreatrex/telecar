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
    *diffCommands(oldState) {
        if (oldState.forward !== this.forward)
            yield `gpio write 27 ${oldState.forward ? exports.STOP : exports.GO}`;
        if (oldState.back !== this.back)
            yield `gpio write 1 ${oldState.back ? exports.STOP : exports.GO}`;
        if (oldState.left !== this.left)
            yield `gpio write 6 ${oldState.left ? exports.STOP : exports.GO}`;
        if (oldState.right !== this.right)
            yield `gpio write 26 ${oldState.right ? exports.STOP : exports.GO}`;
    }
}
exports.CarState = CarState;
