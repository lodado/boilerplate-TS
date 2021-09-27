import 'Scss/style.scss';

import { TypeClass, SpaRouter } from './SpaRouter';

import storetest from '@Component/storetest/';

class App extends SpaRouter {
  setRoutes(): void {
    this.routes = {
      '/': [new TypeClass(storetest, this.$body, this.store)],
    };
  }

  addRouterEvent(): void {
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
