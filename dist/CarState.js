"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    *diffCommands(other) {
        if (other.forward !== this.forward)
            yield `gpio write 27 ${other.forward ? 0 : 1}`;
        if (other.back !== this.back)
            yield `gpio write 1 ${other.back ? 0 : 1}`;
        if (other.left !== this.left)
            yield `gpio write 6 ${other.left ? 0 : 1}`;
        if (other.right !== this.right)
            yield `gpio write 26 ${other.right ? 0 : 1}`;
    }
}
exports.CarState = CarState;
