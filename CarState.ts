export class CarState {
  public forward: boolean = false;
  public back: boolean = false;
  public left: boolean = false;
  public right: boolean = false;

  constructor(private direction = '') {
    this.direction = direction.trim();
    switch (this.direction) {
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
    switch (this.direction) {
      case 'forward':
        return '🡹';
      case 'forward left':
        return '🡼';
      case 'forward right':
        return '🡽';
      case 'back':
        return '🡻';
      case 'back left':
        return '🡿';
      case 'back right':
        return '🡾';
      default:
        return '—';
    }
  }
}
