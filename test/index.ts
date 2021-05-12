import AweSomeVue from '../core/AweSomeVue'

const instance = new AweSomeVue({
  el: document.getElementsByTagName('div')[0],
  render(h) {
    return h('div', null, null)
  }
})
setTimeout(() => {
  instance.init({
    el: instance.$el,
    render(h) {
      return h('div', null, h('div', null, h('div', null, '2313')))
    }
  })
}, 1500)
