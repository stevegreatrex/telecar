import { ICommand } from './ICommand';
import { directionPins } from './MoveCommand';
import { Pins } from './Pins';

export class InitCommand implements ICommand {
  run(_pins: Pins) {
    //unused - init is handled by constructing Pins
  }

  get commandString() {
    return (
      `gpio mode ${directionPins.forward} out && ` +
      `gpio mode ${directionPins.back} out && ` +
      `gpio mode ${directionPins.left} out && ` +
      `gpio mode ${directionPins.right} out`
    );
  }

  debugInfo = 'initialize pins';
}
