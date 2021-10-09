import Header from './header';
import Main from './main';

import Composite from '@Component/composite';

export default class WriteHeader extends Composite {
  template(): string {
    return '';
  }

  mount() {
    new Header(this.$target!, this.props, undefined);
    new Main(this.$target!, this.props, undefined);
  }
}
