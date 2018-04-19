import { ICommand } from './ICommand';
import { directionPins } from './MoveCommand';

export class InitCommand implements ICommand {
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
