import View from '@Component/view';
import './style.scss';

export default class MainHeader extends View {
  setBackground(): void {
    this.position = { id: 'main-header', class: 'main-header', tag: 'header' };
  }

  template(): string {
    return `

      <div class='main-header-category category'></div>
      <div class="row-icon">
        <div class="main-header-ping"> </div>
        <div > 장소 전체 </div>
      </div>
      <div class="row-icon">
        <div class="main-header-user login"></div>
        <div class="main-header-menu menu"></div>
      </div>
    `;
  }
}
