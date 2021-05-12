import mount from './mount'
import patch from './patch'

export default function renderAweSomeVue(vnode, container, context) {
  if (context.$vnode) {
    patch(vnode, context.$vnode, context.$el)
  } else {
    mount(vnode, container)
  }
}