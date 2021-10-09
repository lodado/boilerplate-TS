class TypeClass {
  constructor(
    public className: any,
    public body: HTMLElement,
    public store: observableStore
  ) {}
}

interface observableStore {
  [index: string]: string | number;
  a: any;
  b: any;
}

interface nonObservableStore {
  [index: string]: string | number | undefined;
}

interface divTags {
  id?: string;
  class?: string;
  tag?: string;
}

interface router {}

export { router, TypeClass, observableStore, nonObservableStore, divTags };
