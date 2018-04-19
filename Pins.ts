import { Gpio } from 'onoff';
import { directionPins } from './MoveCommand';

export class Pins {
  public forward = new Gpio(directionPins.forward, 'out');
  public back = new Gpio(directionPins.back, 'out');
  public left = new Gpio(directionPins.left, 'out');
  public right = new Gpio(directionPins.right, 'out');
}
