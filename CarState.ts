export const GO = 0;
export const STOP = 1;

export class CarState {
  public forward: boolean = false;
  public back: boolean = false;
  public left: boolean = false;
  public right: boolean = false;

  constructor(direction?: string) {
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
      }
    }
  }

  public *diffCommands(oldState: CarState) {
    if (oldState.forward !== this.forward)
      yield `gpio write 27 ${oldState.forward ? STOP : GO}`;

    if (oldState.back !== this.back)
      yield `gpio write 1 ${oldState.back ? STOP : GO}`;

    if (oldState.left !== this.left)
      yield `gpio write 6 ${oldState.left ? STOP : GO}`;

    if (oldState.right !== this.right)
      yield `gpio write 26 ${oldState.right ? STOP : GO}`;
  }

  toString() {
    return `F:${this.forward} B: ${this.back} L: ${this.left} R: ${this.right}`;
  }
}
