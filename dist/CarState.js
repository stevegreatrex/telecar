"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CarState {
    constructor(direction = '') {
        this.direction = direction;
        this.forward = false;
        this.back = false;
        this.left = false;
        this.right = false;
        this.direction = direction.trim();
        switch (this.direction) {
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
        switch (this.direction) {
            case 'forward':
                return '🡹';
            case 'forward left':
                return '🡼';
            case 'forward right':
                return '🡽';
            case 'back':
                return '🡻';
            case 'back left':
                return '🡿';
            case 'back right':
                return '🡾';
            default:
                return '⛔';
        }
    }
}
exports.CarState = CarState;
