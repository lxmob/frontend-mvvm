export default class  Compiler {
  constructor (vm) {
    this.vm = vm;
    this.compiler(vm.$el);
  }

  compiler ($el) {
    const childNodes = $el.childNodes;
    [...childNodes].forEach(node => {
      if (node.nodeType === 1) {
        this.compilerElement(this.vm, node);
        this.compiler(node);
      } else {
        this.compilerText(this.vm, node)
      }
    })
  }

  compilerElement (vm, node) {
    const attrs = node.attributes;
    [...attrs].forEach(attr => {
      const attrName = attr.name;
      // v-model="title"
      if (attrName.includes('v-')) {
        const attrValue = attr.value;
        // ['v', 'model']
        const [, directive] = attrName.split('-');
        compilerUtils[directive](vm, attrValue, node);
      }
    })
  }

  compilerText (vm, node) {
    const text = node.textContent;
    if (regExpr.test(text)) {
      compilerUtils['text'](vm, text, node);
    }
  }
}

const regExpr = /\{\{(.+?)\}\}/;

const compilerUtils = {
  model (vm, value, node) {
    const cb = () => node.value = vm.$data[value];
    node.addEventListener('input', function () {
      vm.$data[value] = node.value;
    }, false);
    node.removeAttribute('v-model');
    vm.dep.add(value, cb);
    cb();
  },
  text (vm, text, node) {
    // {{ title }}
    node.textContent = text.replace(regExpr, (_, key) => {
      const sKey = key.trim();
      const cb = () => node.textContent = vm.$data[sKey];
      vm.dep.add(sKey, cb);
      return vm.$data[sKey];
    })
  }
}
