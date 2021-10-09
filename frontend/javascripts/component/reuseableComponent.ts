import View from '@Component/view';

// mount용 view
export default abstract class Component extends View {
  setBackground(): void {
    this.position = { id: this.constructor.name };
  }
}
