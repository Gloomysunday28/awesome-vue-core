import h from '../Render/render'
import { getHumpTransformReverse } from '../../utils'

const needCurrentAttribute = /value|checked|selected|muted/
function getAttributes(el, data) {
  const { styles = {}, staticClass, ...rest } = data || {}

  for (let key in styles) {
    el.style[getHumpTransformReverse(key)] = typeof styles[key] === 'number' ? styles[key] + 'px' : styles[key]
  }

  if (staticClass) {
    el.className = staticClass
  }

  for (let key in rest) {
    if (key === 'on') {
      if (Object.prototype.toString.call(rest[key]) !== '[object Object]') continue
      const eventHandler = rest[key]
      for (let event in eventHandler) {
        el.addEventListener(event, eventHandler[event])
      }
    } else if (needCurrentAttribute.test(key)) {
      el[key] = rest[key]
    } else {
      el.setAttribute(key, rest[key])
    }
  }
}

function mountText(children, container) { // 挂载文本节点
  const el = document.createTextNode(children)
  container.appendChild(el)
}

function mountChildren(children, el, childrenFlags, isSvg?) { // 挂载子节点
  switch (childrenFlags) {
    case 'MutilpleChildren':
      for (let c = 0, len = children.length; c < len; c++) {
        mount(children[c], el, isSvg) 
      }
      break
    case 'SingleChildren':
      mount(children, el, isSvg) 
      break
    case 'Text':
      mount(children, el) 
      break
    default:
      break
  }
}

function mountElement(vnode, container, isSvg) { // 常规html挂载
  const { tag, children, childrenFlags, data } = vnode
  const el = isSvg ? 
    document.createElementNS((data || {}).href || 'http://www.w3.org/1999/xhtml', tag)
    : 
    document.createElement(tag)
  vnode.el = el

  getAttributes(el, vnode.data)
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
      vnode.el = children.el
      break
    default:
      break
  }
  container.appendChild(fragment)
}

function mountPortal(vnode) {
  const { children, childrenFlags, data: { target } } = vnode
  vnode.el = null

  mountChildren(children, document.querySelector(target), childrenFlags)
}

function mountStatusComponent(vnode, container) {
  const instance = new vnode.tag()
  const instanceVnode = instance.render(h)
  mount(instanceVnode, container)
  instance.$el = vnode.el = instanceVnode.el
}

function mountFunctionalComponent(vnode, container, isSvg) {
  const $vnode = vnode.tag()
  mount($vnode, container, isSvg)
  vnode.el = $vnode.el
}

export default function mount(vnode, container, isSvg?) { // 渲染虚拟Dom
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
    mountText(vnode, container)
  }
}