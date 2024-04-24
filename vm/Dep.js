export default class Dep {
  constructor () {
    this.deps = new Map();
  }

  add (key, cb) {
    const cbs = this.deps.get(key);
    this.deps.set(key, cbs ? [...cbs, cb] : [cb]);
  }

  notify (key) {
    this.deps.get(key).forEach(cb => cb());
  }
}