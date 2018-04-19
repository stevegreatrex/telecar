import { Pins } from './Pins';

export interface ICommand {
  commandString: string;
  debugInfo: string;

  run(pins: Pins): void;
}
