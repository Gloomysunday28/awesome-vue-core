import { VnodeTypes } from '../Vnode/types/vnode.type'
import { createElement, getAttributes } from './createElement'

function addVnode(nvnode, pvnode: any = {}, container?) {
  switch (nvnode.flags) {
    case 'Normal':
      addElement(nvnode, pvnode, container)
      console.log(nvnode)
      console.log('p', pvnode)
      patchChildren(nvnode, pvnode, container)
      break
    case 'Text':
      if (nvnode.children !== pvnode.children) {
        nvnode.el.innerHTML = nvnode.children
      }
      break
    default:
      break
  }
}

function removeVnode(vnode) {
  const { el } = vnode
  switch (vnode.flags) {
    case 'Text':
    case 'Normal':
      el.parentNode.removeChild(el)
      break
    default:
      break
  }
}

function removeElement(vnode) {
  const { el } = vnode
  el.parentNode.removeChild(el)
}

function addElement(nvnode, pvnode?, container?) {
  const { el } = createElement(nvnode, nvnode.flags === 'Svg')

  if (pvnode) {
    pvnode.el.parentNode.insertBefore(el, pvnode.el.nextElementSibling)
  } else if (container) {
    container.appendChild(el)
  }
}

function replaceElement(pvnode, nvnode): unknown { // 替换元素
  addVnode(nvnode, pvnode)
  removeVnode(pvnode)
  return 
}

function patchText(nvnode) {
  nvnode.el.innerHTML = nvnode.children
}

function patchChildren(nvnode, pvnode, container?) { // 处理子元素
  const { childrenFlags, children, el /* 父容器 */ } = nvnode || {}
  const { childrenFlags: pChildrenFlags, children: pChildren } = pvnode || {}
  if (pChildrenFlags === 'NoChildren') {
    switch (childrenFlags) {
      case 'NoChildren':
        return
      case 'SingleChildren':
        return patch(children, null, el)
      case 'MutilpleChildren':
        children.forEach(child => {
          patch(child, null, el)
        })
        return
      case 'Text':
        addElement(nvnode, null, container)
        return patchText(nvnode)
      default:
        return
    }
  } else if (pChildrenFlags === 'SingleChildren') {
    switch (childrenFlags) {
      case 'NoChildren':
        return removeElement(pvnode)
      case 'SingleChildren':
        return patch(children, pChildren)
      case 'MutilpleChildren':
        children.forEach(child => {
          patch(child, pChildren, el)
        })
        return
      case 'Text':
        nvnode.el = pvnode.el
        return patchText(nvnode)
      default:
        return
    }
  } else if (pChildrenFlags === 'MutilpleChildren') {
    switch (childrenFlags) {
      case 'NoChildren':
        pChildren.forEach(child => {
          removeVnode(child)
        })
        return
      case 'SingleChildren':
        pChildren.forEach(child => {
          removeVnode(child)
        })
        return addElement(null, children, el)
      case 'MutilpleChildren':
        children.forEach(child => {
          patch(child, null, el)
        })

        pChildren.forEach(child => {
          removeVnode(child)
        })

        return
      case 'Text':
        nvnode.el = pvnode.el
        return patchText(nvnode)
      default:
        return
    }
  } else if (pChildrenFlags === 'Text') {
    switch (childrenFlags) {
      case 'NoChildren':
        removeVnode(pChildren)
        return
      case 'SingleChildren':
        console.log('replapChildrenFlagsce', pvnode)
        return addVnode(children, null, el)
      case 'MutilpleChildren':
        children.forEach(child => {
          patch(child, null, el)
        })

        pChildren.forEach(child => {
          removeVnode(child)
        })

        return
      case 'Text':
        nvnode.el = pvnode.el
        if (pChildren === children) return
        return patchText(nvnode)
      default:
        return
    }
  }
}

function patchElement(nvnode, pvnode) {
  if (pvnode.tag !== nvnode.tag) {
    return replaceElement(pvnode, nvnode) // tag是每一个vnode的类型，当类型不同的情况下替换新旧节点
  } else {
    if (pvnode.flags === nvnode.flags) { // vnode.flags代表当前vnode类型
      nvnode.el = pvnode.el
      getAttributes(nvnode, pvnode)
      console.log(pvnode.el)
      patchChildren(nvnode, pvnode, nvnode.el)
    } else {
      return replaceElement(pvnode, nvnode)
    }
  }
}

export default function patch<T extends VnodeTypes>(nvnode: T, pvnode: T, container?: HTMLElement) {
  if (pvnode) {
    if (nvnode) {
      nvnode.el = pvnode.el
      patchElement(nvnode, pvnode)
    } else {
      removeVnode(pvnode) // 若是新节点不存在旧节点存在，那么删除旧节点
    }
  } else {
    addVnode(nvnode, null, container)
  }
}