"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GO = 0;
exports.STOP = 1;
class MoveCommand {
    constructor(oldState, newState) {
        this.oldState = oldState;
        this.newState = newState;
    }
    get commandString() {
        let command = '';
        Object.keys(exports.directionPins).forEach(directionString => {
            const direction = directionString;
            if (this.newState[direction] === this.oldState[direction])
                return;
            if (command.length)
                command += ' && ';
            command += `gpio write ${exports.directionPins[direction]} ${this.newState[direction] ? exports.GO : exports.STOP}`;
        });
        return command;
    }
    get debugInfo() {
        return this.newState.toString();
    }
}
exports.MoveCommand = MoveCommand;
exports.directionPins = {
    forward: 27,
    back: 1,
    left: 6,
    right: 26
};
