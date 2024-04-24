export default function reactive (vm, data) {
  return new Proxy(data, {
    get: (target, key) => {
      return Reflect.get(target, key);
    },
    set: (target, key, value) => {
      const result = Reflect.set(target, key, value);
      // 更新视图
      vm.dep.notify(key);
      return result;
    }
  })
}