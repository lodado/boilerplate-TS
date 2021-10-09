import View from '@Component/view';

import './style.scss';

export default class MainMain extends View {
  setBackground(): void {
    this.position = { id: 'main-main', tag: 'main' };
  }

  template(): string {
    return `
    <div class='main-fab write'>
        
    </div>
    `;
  }

  async insertFetchData(): Promise<void> {}

  mount(): void {}

  setEvent(): void {}
}
