import bind from 'autobind-decorator';
import { observable, action } from 'mobx';

@bind
class CountStore {
  @observable
  count = 0;
  @observable
  increasing = false;

  @action
  reset () {
    if (this.increasing) {
      return;
    }
    this.count = 0;
  }

  @action
  increase () {
    if (this.increasing) {
      return;
    }
    this.count++;
  }

  @action
  doubleAsync () {
    if (this.increasing) {
      return;
    }
    this.increasing = true;
    setTimeout(() => {
      this.count *= 2;
      this.increasing = false;
    }, Math.random() * 1000);
  }
}

export default CountStore;
