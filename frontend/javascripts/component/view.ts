import StateController from '../StateController';
import {
  observableStore,
  nonObservableStore,
  divTags,
} from '@Interface/common';

/**
 * 메뉴 항목을 추가한다.
 * @param {Element} id 부모 Element (ELEMENT)
 * @param {observableStore} Object 전역 상태 state
 * @param {props} Object 자신의 상태(지역) state
 * @param {position} Object 자신 background attribute들
 * @param {Difunc} Object DI(Dependency injection)용 함수, 변수 넣는 객체
 **/
export default abstract class View {
  public observableStore: observableStore = StateController.observableStore;
  public nonObservableStore: nonObservableStore =
    StateController.nonObservableStore;

  public nowTarget?: null | Element;

  constructor(
    public $target: Element,
    public props: observableStore,
    public position: divTags = {},
    public Difunc: any = undefined
  ) {
    this.setBackground();
    this.setup();
  }

  //set position
  abstract setBackground(): void;

  //내부 구성
  abstract template(): string;

  //not must
  setEvent(): void {}

  async insertFetchData(): Promise<void> {}

  //not must
  mount(): void {}

  setup(): void {
    this.props = StateController.observable(this.props);

    StateController.observe(async () => {
      this.render();
      this.setEvent();
      this.mount();
    });
  }

  //background
  backGroundTemplate(): string {
    const arr: Array<any> = Object.entries(this.position);

    if (arr.length <= 0) return this.template();

    const backGround: string = this.createBackground(arr);

    return `<${
      this.position.tag ?? 'div'
    } ${backGround}>${this.template()}</div>`;
  }

  createBackground(arr: Array<any>) {
    const backGround: string = arr
      .map((k, v) => (k[0] !== 'tag' ? `${k[0]}=${k[1]}` : ''))
      .join(' ');

    return backGround;
  }

  render(): void {
    const template = this.backGroundTemplate();

    if (this.nowTarget) {
      this.nowTarget.outerHTML = template;
    } else this.$target.insertAdjacentHTML('beforeend', template);

    this.nowTarget = this.$target.querySelector(`#${this.position.id}`);

    this.insertFetchData();
  }

  //버블링 사용
  addEvent(eventType: string, selector: string, callback: Function): void {
    const children: Array<Element> = [
      ...(this.$target.querySelectorAll(selector) as any),
    ];

    const isTarget = (target: Element) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event: any) => {
      if (!isTarget(event.target)) return false;

      callback(event);
    });
  }

  async getFetch(
    path: string,
    data: any = undefined,
    method: string = 'GET'
  ): Promise<any> {
    return new Promise(function (resolve, reject) {
      fetch(path, {
        method: method,
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => console.log(e));
    });
  }

  uploadFile(
    path: string,
    data: Array<File>,
    content: any,
    method: string = 'GET'
  ): Promise<any> {
    const newData = new FormData();

    data.map((ele: File) => newData.append('uploadData', ele));
    newData.append(
      'key',
      new Blob([JSON.stringify(content)], { type: 'application/json' })
    );

    return new Promise(function (resolve, reject) {
      fetch(path, {
        method: method,
        redirect: 'follow',
        body: newData,
        headers: {},
      })
        .then((response: any) => resolve(response))
        .catch((response: any) => reject(response));
    });
  }

  moveEvent(path: string) {
    const div: HTMLElement = document.createElement('div');

    div.setAttribute('class', path);
    document.body.appendChild(div);
    div.click();
    div.remove();
  }
}
