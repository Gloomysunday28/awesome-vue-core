import AweSomeVue from '../core/AweSomeVue'

const Fragment = Symbol('Fragment')
const Portal = Symbol('Portal')
const instance = new AweSomeVue({
  el: document.getElementsByTagName('div')[0],
  render(h) {
    return h('div', { staticClass: 'bem' }, ['oldChildren2', h(Portal, { target: 'body' }, 'oldChildren'), h(Fragment, null, 'Fragment')])
  }
})
setTimeout(() => {
  instance.init({
    el: instance.$el,
    render(h) {
      return h('div', { staticClass: 'bem' }, h(Portal, { target: 'body' }, 'newChildren2'))
    }
  })
}, 1500)
