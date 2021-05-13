import AweSomeVue from '../core/AweSomeVue'

const Fragment = Symbol('Fragment')
const Portal = Symbol('Portal')
const App = {
  name: 'App',
  render(h) {
    return h('input', {value: 'App'}, 'App')
  }
}
const instance = new AweSomeVue({
  el: document.getElementsByTagName('div')[0],
  render(h) {
    return h('div', { staticClass: 'bem' }, h(App, { value: 'App' }, null))
  }
})
setTimeout(() => {
  App.render = function(h) {
    return h('input', { value: 'App2' }, null)
  }
  instance.init({
    el: instance.$el,
    render(h) {
      return h('div', { staticClass: 'bem' }, h(App, { value: 'App2' }, null))
    }
  })
}, 1500)
