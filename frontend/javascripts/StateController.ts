import { state } from '@Interfaces/interfaces';
class StateController {
  public state: state;

  private cursor: Function | undefined | null = undefined;

  public observers: any = new Set<any>();

  constructor() {
    this.state = {
      a: 10,
      b: 20,
    };
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

  observable(obj: state) {
    const that = this;

    const observer: Array<Function> = that.observers[JSON.stringify(obj)] || [];
    //key값 duck typing

    Object.keys(obj).map((key: string) => {
      let _value = obj[key];

      Object.defineProperty(obj, key, {
        get() {
          if (that.cursor) observer.push(that.cursor);
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
}

const instance = new StateController();

export default instance;
