export default class myPromise {
  private value: any;

  constructor(callback: Function) {
    callback((value: any) => {
      this.value = value;
    });
  }

  then(callback: Function) {
    callback(this.value);
  }
}
