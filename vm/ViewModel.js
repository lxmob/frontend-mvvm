import Dep from './Dep';
import Compiler from './Compiler';
import reactive from './reactive';

export default class ViewModel {
  constructor ({ el, data }) {
    this.$el = document.querySelector(el);
    this.$data = reactive(this, data());
    this.dep = new Dep();
    this.compiler = new Compiler(this);
  }
}