import 'Scss/style.scss';

import { TypeClass, SpaRouter } from './SpaRouter';

import storetest from '@Component/storetest/';
import storetest1 from '@Component/storetest2/index';

class App extends SpaRouter {
  setRoutes() {
    this.routes = {
      '/': [new TypeClass(storetest, this.$body, this.store)],
      '/search': [new TypeClass(storetest1, this.$body, this.store)],
    };
  }

  addRouterEvent() {
    window.addEventListener('click', ({ target }: any) => {
      if (target.classList.contains('rootBtn')) {
        this.notify('/');
      }

      if (target.classList.contains('searchBtn')) {
        this.notify('/search');
      }
    });
  }
}

new App();
