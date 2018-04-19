export class CarState {
  public forward: boolean = false;
  public back: boolean = false;
  public left: boolean = false;
  public right: boolean = false;

  constructor(direction = '') {
    direction = direction.trim();
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
        break;
      }
    }
  }

  toString() {
    let direction = '';

    if (this.left) direction += '🡸';
    if (this.forward) direction += '🡹';
    if (this.back) direction += '🡻';
    if (this.right) direction += '🡺';
    if (!direction.length) direction = '⛔';
    return direction;
  }
}
