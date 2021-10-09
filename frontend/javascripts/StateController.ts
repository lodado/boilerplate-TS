import { observableStore, nonObservableStore } from '@Interface/common';

class StateController {
  public observableStore: observableStore;
  public nonObservableStore: nonObservableStore;

  private cursor: Function | undefined | null = undefined;
  public observers: any;

  constructor() {
    this.observableStore = {
      a: 10,
      b: 20,
    };

    this.nonObservableStore = {};

    this.init();
  }

  debounceFrame = (callback: any) => {
    let currentCallback: number = -1;

    return () => {
      cancelAnimationFrame(currentCallback);
      currentCallback = requestAnimationFrame(callback);
    };
  };

  observe(callback: Function) {
    this.cursor = this.debounceFrame(callback);
    callback();
    this.cursor = null;
  }

  observable(obj: observableStore) {
    const that = this;

    const observer: Array<Function> = that.observers[JSON.stringify(obj)] || [];
    //key값 duck typing

    Object.keys(obj).map((key: string) => {
      let _value = obj[key];

      Object.defineProperty(obj, key, {
        get() {
          if (that.cursor) {
            observer.push(that.cursor);
          }

          return _value;
        },

        set(value) {
          if (_value === value) return;
          if (JSON.stringify(_value) === JSON.stringify(value)) return;

          _value = value;
          observer.forEach((fn) => fn());
        },
      });
    });

    that.observers[JSON.stringify(obj)] = observer;

    return obj;
  }

  init(): void {
    this.observers = new Set<any>();
  }
}

const instance = new StateController();

export default instance;
