import StateController from './StateController';
import { state } from '@Interfaces/interfaces';
import Component from '@Component/component';

class TypeClass {
  constructor(
    public className: any,
    public body: HTMLElement,
    public store: state
  ) {}
}

class SpaRouter {
  protected $body: HTMLElement;
  protected store: state;
  protected stackPath: Array<string>;
  protected routes: any;

  constructor() {
    this.$body = document.querySelector('body')!;
    this.store = StateController.state;

    this.stackPath = [window.location.pathname];

    this.setRoutes();

    this.notify(this.stackPath[0]);
    this.addRouterEvent();
  }

  setRoutes() {}

  addRouterEvent() {}

  notify(currentPath: string) {
    this.historyRouterPush(currentPath);
    this.initialRoutes(this.$body, currentPath);
  }

  render(baseElement: HTMLElement, pathName: string = '/') {
    baseElement.innerHTML = '';

    const now = this.routes[pathName];

    now.map((ele: TypeClass) => {
      new ele.className(ele.body, ele.store);
    });
  }

  initialRoutes(baseElement: HTMLElement, currentPath: string) {
    this.render(baseElement, currentPath);

    window.onpopstate = () => {
      const now: string = this.stackPath.pop()!;
      this.render(baseElement, now);
      this.stackPath.push(now);
    };
  }

  historyRouterPush(pathName: string) {
    window.history.pushState({}, pathName, window.location.origin + pathName);
  }
}

export { TypeClass, SpaRouter };
