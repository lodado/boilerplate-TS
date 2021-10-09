import { TypeClass, SpaRouter } from './SpaRouter';
import main from '@View/main/';

class App extends SpaRouter {
  setRoutes(): void {
    this.routes = {
      '/': {
        html: [new TypeClass(main, this.$app, this.observableStore)],
        animation: '',
      },
    };
  }

  addRouterEvent(): void {
    this.LoginCheckPath = ['write'];

    window.addEventListener('click', ({ target }: any) => {
      Object.keys(this.routes).some((ele) => {
        if (ele.length > 1) {
          return this.routingEvent(target, ele);
        }
        return false;
      });

      if (target.classList.contains('goback')) {
        history.back();
      } else if (target.classList.contains('root')) {
        this.notify('/');
      }
    });
  }

  preventHistoryPush(pathName: string): boolean {
    const preventArr = ['write', 'login'];

    return preventArr.some((ele) => `/${ele}` === pathName);
  }
}

new App();
