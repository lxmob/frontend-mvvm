import ViewModel from './vm/ViewModel';

const vm = new ViewModel({
  el: '#app',
  data () {
    return {
      dateTime: new Date(),
      title: ''
    }
  }
})

console.log(vm);

setInterval(() => {
  vm.$data.dateTime = new Date();
}, 1000)

setTimeout(() => {
  vm.$data.title = 'Hello MVVM!';
}, 2000)
