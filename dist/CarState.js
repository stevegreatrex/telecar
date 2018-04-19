"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CarState {
    constructor(direction = '') {
        this.forward = false;
        this.back = false;
        this.left = false;
        this.right = false;
        direction = direction.trim();
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
                break;
            }
        }
    }
    toString() {
        let direction = '';
        if (this.left)
            direction += '🡸';
        if (this.forward)
            direction += '🡹';
        if (this.back)
            direction += '🡻';
        if (this.right)
            direction += '🡺';
        if (!direction.length)
            direction = '⛔';
        return direction;
    }
}
exports.CarState = CarState;
