import Component from 'Component/component.js';

export default class test1 extends Component {
  setBackground() {
    this.position = { id: 'test1' };
  }

  async template() {
    return `<input id="stateABC" value="${this.props.a}" size="5" />;
    <p>a + b 2222= ${this.props.a + this.props.b}</p>`;
  }
}
