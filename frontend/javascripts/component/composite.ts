import { observableStore } from '@Interface/common';

export default abstract class Composite {
  constructor(
    public $target: HTMLElement,
    public props: observableStore,
    public position: any
  ) {
    this.mount();
  }

  mount() {}
}
