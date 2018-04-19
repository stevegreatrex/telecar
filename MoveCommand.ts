import { CarState } from './CarState';
import { ICommand } from './ICommand';

export type Direction = 'forward' | 'back' | 'left' | 'right';
export const GO = 0;
export const STOP = 1;

export class MoveCommand implements ICommand {
  constructor(public oldState: CarState, public newState: CarState) {}

  get commandString() {
    let command = '';

    Object.keys(directionPins).forEach(directionString => {
      const direction = directionString as Direction;
      if (this.newState[direction] === this.oldState[direction]) return;

      if (command.length) command += ' && ';

      command += `gpio write ${directionPins[direction]} ${
        this.newState[direction] ? GO : STOP
      }`;
    });

    return command;
  }

  get debugInfo() {
    return this.newState.toString();
  }
}

export const directionPins = {
  forward: 27,
  back: 1,
  left: 6,
  right: 26
};
