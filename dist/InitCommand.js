"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveCommand_1 = require("./MoveCommand");
class InitCommand {
    constructor() {
        this.debugInfo = 'initialize pins';
    }
    get commandString() {
        return (`gpio mode ${MoveCommand_1.directionPins.forward} out && ` +
            `gpio mode ${MoveCommand_1.directionPins.back} out && ` +
            `gpio mode ${MoveCommand_1.directionPins.left} out && ` +
            `gpio mode ${MoveCommand_1.directionPins.right} out`);
    }
}
exports.InitCommand = InitCommand;
