"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onoff_1 = require("onoff");
const MoveCommand_1 = require("./MoveCommand");
class Pins {
    constructor() {
        this.forward = new onoff_1.Gpio(MoveCommand_1.directionPins.forward, 'out');
        this.back = new onoff_1.Gpio(MoveCommand_1.directionPins.back, 'out');
        this.left = new onoff_1.Gpio(MoveCommand_1.directionPins.left, 'out');
        this.right = new onoff_1.Gpio(MoveCommand_1.directionPins.right, 'out');
    }
}
exports.Pins = Pins;
