import h from '../Render/render'
import { mountChildren, createElement } from './createElement'

function mountText(children, container, parent?) { // 挂载文本节点
  const el = document.createTextNode(children)
  console.log('p', parent)
  if (parent && parent.flags === 'Portal') {
    (parent.el || (parent.el = [])).push(el)
  }
  container.appendChild(el)
}

function mountElement(vnode, container, isSvg) { // 常规html挂载
  const { children, childrenFlags } = vnode
  const { el } = createElement(vnode, isSvg)
  mountChildren(children, el, childrenFlags, isSvg)
  container.appendChild(el)
}

function mountFragment(vnode, container) {
  const { children, childrenFlags } = vnode
  const fragment = document.createDocumentFragment()

  mountChildren(children, fragment, childrenFlags)
  switch (childrenFlags) {
    case 'MutilpleChildren':
      vnode.el = children[0].el
      break
    case 'SingleChildren':
      vnode.el = children.el
      break
    case 'Text':
      vnode.el = container
      break
    default:
      break
  }

  container.appendChild(fragment)
}

function mountPortal(vnode) {
  const { children, childrenFlags, data: { target } } = vnode
  mountChildren(children, document.querySelector(target), childrenFlags, false, vnode);

  (vnode.el || (vnode.el = [])).push(...(Array.isArray(children) ? children : [children]).map(vChild => vChild.el).filter(Boolean))
}

function mountStatusComponent(vnode, container) {
  const instance = new vnode.tag()
  const instanceVnode = instance.render(h)
  mount(instanceVnode, container)
  instance.$el = vnode.el = instanceVnode.el
  instance.$vnode = instanceVnode
  if (!instance.isMounted) {
    instance.mounted && instance.mounted(instance)
    instance.isMounted = true
  }
}

function mountFunctionalComponent(vnode, container, isSvg) {
  const $vnode = vnode.tag()
  mount($vnode, container, isSvg)
  vnode.el = $vnode.el
}

export default function mount(vnode, container, isSvg?, parent?) { // 渲染虚拟Dom
  const flags = vnode.flags
  if (flags) {
    switch(flags) {
      case 'Normal':
      case 'Svg':
        mountElement(vnode, container, isSvg || flags === 'Svg')
        break
      case 'Fragment':
        mountFragment(vnode, container)
        break
      case 'Portal':
        mountPortal(vnode)
        break
      case 'StatusComponent':
        mountStatusComponent(vnode, container)
        break
      case 'FunctionalComponent':
        mountFunctionalComponent(vnode, container, isSvg || flags === 'Svg')
        break
      default:
        break
    }
  } else if (['number', 'string'].some(v => typeof vnode === v)) {
    mountText(vnode, container, parent)
  }
}