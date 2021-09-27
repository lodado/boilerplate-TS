import StateController from '../StateController';
import { state, divTags } from '@Interfaces/interfaces';
/**
 * 메뉴 항목을 추가한다.
 * @param {HtmlElement} id 부모 Element (HTML ELEMENT)
 * @param {state} Object 전역 상태 state
 * @param {props} Object 자신의 상태(지역) state
 * @param {position} Object 자신 background attribute들
 * @param {Difunc} Object DI(Dependency injection)용 함수, 변수 넣는 객체
 **/
export default class Component {
  public state: any = StateController.state;

  public backGround: any;

  public nowTarget: undefined | null | Element;

  constructor(
    public $target: Element,
    public props: state,
    public position: divTags,
    public Difunc: any = undefined
  ) {
    this.setBackground();
    this.setup();
  }

  setBackground(): void {
    //set position
  }

  setup(): void {
    this.props = StateController.observable(this.props);

    StateController.observe(async () => {
      await this.render();
      this.setEvent();
      this.mount();
    });
  }

  //내부 구성
  async template(): Promise<string> {
    return '';
  }

  //background
  async backGroundTemplate(): Promise<string> {
    const arr: Array<any> = Object.entries(this.position);

    if (arr.length <= 0) return await this.template();

    if (!this.backGround) {
      this.backGround = arr
        .map((k, v) => (k[0] !== 'tag' ? `${k[0]}=${k[1]}` : ''))
        .join(' ');
    }

    return `<${this.position.tag ?? 'div'} ${
      this.backGround
    }>${await this.template()}</div>`;
  }

  async render(): Promise<void> {
    this.nowTarget = this.$target.querySelector(`#${this.position.id}`);
    const template = await this.backGroundTemplate();

    if (this.nowTarget) {
      this.nowTarget.outerHTML = template;
    } else this.$target.insertAdjacentHTML('beforeend', template);
  }

  setEvent(): void {}

  mount(): void {}

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
}
