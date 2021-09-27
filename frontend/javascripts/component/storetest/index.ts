import Component from 'Component/component.js';
import './style.scss';

export default class test extends Component {
  setBackground() {
    this.position = { id: 'test', tag: 'header' };
  }

  async template() {
    return `
      <input id="stateA" value="${this.props.a}" size="5" />
      <input id="stateB" value="${this.props.b}" size="5" />
      <p>a + b 1111= ${this.props.a + this.props.b}</p>
    `;
  }

  setEvent() {
    const { $target, props } = this;

    $target
      .querySelector('#stateA')
      .addEventListener('change', ({ target }) => {
        props.a = Number(target.value);
      });

    $target
      .querySelector('#stateB')
      .addEventListener('change', ({ target }) => {
        props.b = Number(target.value);
      });
  }
}
