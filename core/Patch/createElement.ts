import { getHumpTransformReverse } from '../../utils'
import h from '../Render/render'
import mount from './mount'

const needCurrentAttribute = /value|checked|selected|muted/
export const formTag = ['input', 'checkbox', 'radio']
function processDomProperties(rest, el, handlerRest?) {
  for (let key in rest) {
    if (key === 'on') {
      if (Object.prototype.toString.call(rest[key]) !== '[object Object]') continue
      const eventHandler = rest[key]
      for (let event in eventHandler) {
        el[handlerRest ? 'removeEventListener' : 'addEventListener'](event, eventHandler[event])
      }
    }
    if (handlerRest === void 0 || !handlerRest.hasOwnProperty(key)) {
      if (needCurrentAttribute.test(key)) {
        el[key] = handlerRest ? void 0 : rest[key]
      } else {
        handlerRest ?
        el.removeAttribute(key)
        :
        el.setAttribute(key, rest[key])
      }
    }
  }
}


export function mountText(children, container, parent?) { // 挂载文本节点
  const el = document.createTextNode(children)
  if (parent && parent.flags === 'Portal') {
    (parent.el || (parent.el = [])).push(el)
  }
  container.appendChild(el)
}

export function mountFragment(vnode, container) {
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

export function mountPortal(vnode) {
  const { children, childrenFlags, data: { target } } = vnode
  mountChildren(children, document.querySelector(target), childrenFlags, false, vnode);

  (vnode.el || (vnode.el = [])).push(...(Array.isArray(children) ? children : [children]).map(vChild => vChild.el).filter(Boolean))
}


export function mountElement(vnode, container, isSvg) { // 常规html挂载
  const { el } = createElement(vnode, isSvg)
  container.appendChild(el)

  return el
}

export function mountStatusComponent(vnode) {
  const instance = vnode.instance = new vnode.tag()
  const instanceVnode = instance.render(h)
  instance.$el = vnode.el = instanceVnode.el
  instance.$vnode = instanceVnode
  if (!instance.isMounted) {
    instance.mounted && instance.mounted(instance)
    instance.isMounted = true
  }

  return instanceVnode
}

export function mountFunctionalComponent(vnode) {
  const $vnode = vnode.tag()
  vnode.el = $vnode.el

  return $vnode
}

export function mountChildren(children, el, childrenFlags, isSvg?, parent?) { // 挂载子节点
  switch (childrenFlags) {
    case 'MutilpleChildren':
      for (let c = 0, len = children.length; c < len; c++) {
        mount(children[c], el, isSvg, parent)
      }
      break
    case 'SingleChildren':
      mount(children, el, isSvg, parent)
      break
    case 'Text':
      mount(children, el, false, parent) 
      break
    default:
      break
  }
}

export function getAttributes(vnode, pvnode?) {
  const { el } = vnode
  const { styles = {}, staticClass, ...rest } = vnode.data || {}
  const { styles: pStyles, staticClass: pStaticClass, ...pRest} = (pvnode || {}).data || {}

  for (let key in styles) {
    el.style[getHumpTransformReverse(key)] = typeof styles[key] === 'number' ? styles[key] + 'px' : styles[key]
  }
  
  for (let key in pStyles) {
    if (!styles.hasOwnProperty(key)) {
      el.style[getHumpTransformReverse(key)] = void 0
    }
  }

  if (staticClass) {
    el.className = staticClass
  }

  processDomProperties(rest, el)
  processDomProperties(pRest, el, rest)
}


export function createElement(vnode, isSvg) {
  const { tag, data } = vnode
  const el = isSvg ? 
    document.createElementNS((data || {}).href || 'http://www.w3.org/1999/xhtml', tag)
    : 
    document.createElement(tag)

  vnode.el = el
  getAttributes(vnode, null)

  return vnode
}