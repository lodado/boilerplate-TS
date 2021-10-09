import StateController from './StateController';
import {
  TypeClass,
  observableStore,
  nonObservableStore,
} from '@Interface/common';

abstract class SpaRouter {
  protected $app: HTMLElement;
  protected $body: HTMLElement;

  protected observableStore: observableStore;
  protected nonObservableStore: nonObservableStore;

  protected routes?: any;
  protected LoginCheckPath?: Array<string> = [];

  constructor() {
    this.$app = document.querySelector('#app')!;
    this.$body = document.querySelector('body')!;
    this.observableStore = StateController.observableStore;
    this.nonObservableStore = StateController.nonObservableStore;

    this.setRoutes();

    this.notify(window.location.pathname);
    this.addRouterEvent();

    window.onpopstate = () => this.render(this.$app, window.location.pathname);
  }

  abstract setRoutes(): void;

  abstract addRouterEvent(): void;

  preventHistoryPush(pathName: string): boolean {
    return false;
  }

  isLoginPath(path: string): boolean {
    return false;
  }

  notify(currentPath: string): void {
    this.historyRouterPush(currentPath);
    this.render(this.$app, currentPath);
  }

  render(baseElement: HTMLElement, pathName: string = '/'): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    this.setBackGround(baseElement);
    baseElement.innerHTML = '';

    const nowRoutingTarget = this.routes[pathName];
    const { html, animation } = nowRoutingTarget;

    StateController.init();

    this.reAnimationByReflow(baseElement, animation);

    html.map((ele: TypeClass) => {
      new ele.className(ele.body, ele.store);
    });
  }

  setBackGround(baseElement: HTMLElement) {
    const cloneElement: any = baseElement.cloneNode(true);

    cloneElement.className = '';
    cloneElement.classList.add('clone');

    this.$body.appendChild(cloneElement);

    setTimeout(() => {
      cloneElement.remove();
    }, 500);
  }

  reAnimationByReflow(target: HTMLElement, animation: undefined | string) {
    if (!animation) return;

    target.className = '';
    void target.offsetWidth;
    target.classList.add(animation);
  }

  historyRouterPush(pathName: string): void {
    if (this.preventHistoryPush(pathName)) return;

    window.history.pushState({}, pathName, window.location.origin + pathName);
  }

  routingEvent(target: Element, text: string): boolean {
    let cond: string;

    if (text.startsWith('/')) cond = text.substr(1, text.length);
    else cond = text;

    if (target.classList.contains(cond)) {
      if (this.isLoginPath(cond)) {
        this.notify('/login');
      } else {
        this.notify(text);
      }
      return true;
    }

    return false;
  }
}

export { TypeClass, SpaRouter };
