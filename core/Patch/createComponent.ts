import Observer from '../Reactive/Observer'
import h from '../Render/render'
import patch from './patch'
import Watcher from '../Reactive/Watcher'
import { setShallow } from '../globalSwitch'

export function mountStatusComponent(vnode) {
  const instance = vnode.instance = new vnode.tag()
  const $data = instance.$data = instance.data(instance)
  instance.$props = vnode.data.props || {}
  new Observer($data, instance)
  setShallow()
  new Observer(instance.$props, instance)
  setShallow()
  instance._update = function() {
    const instanceVnode = instance.render.call(instance, h)
    if (instance.isMounted) {
      patch(instanceVnode, instance.$vnode)
      instance.updated && instance.updated.call(instance)
    } else {
      instance.mounted && instance.mounted.call(instance)
      instance.isMounted = true
    }
    
    instance.$vnode = instanceVnode
    instance.$el = vnode.el = instanceVnode.el
    return instanceVnode
  }

  return new Watcher(instance._update, instance)
}

export function mountFunctionalComponent(vnode) {
  const $vnode = vnode.tag()
  vnode.el = $vnode.el

  return $vnode
}