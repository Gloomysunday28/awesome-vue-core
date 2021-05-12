import { VnodeTypes } from '../Vnode/types/vnode.type'
import { getAttributes } from './createElement'
import mount from './mount'

function addVnode(nvnode, pvnode: any = {}, container?) {
  switch (nvnode.flags) {
    case 'Normal':
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
      break
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

function replaceVnode(nvnode, pvnode, contianer?) {
  if (nvnode.tag === pvnode.tag) {
    nvnode.el = pvnode.el
    nvnode.el.innerHTML = ''
  } else {
    removeVnode(pvnode)
    addVnode(nvnode, null, contianer) // 这里会创建nvnode.el, 并且不会执行patchChildren, 这里将Children的收集放置到下面处理
  }

  switch(nvnode.childrenFlags) {
    case 'Text':
      nvnode.el.innerHTML = nvnode.children
      break
    default:
      const children = Array.isArray(nvnode.children) ? nvnode.children : [nvnode.children]
      children.forEach(child => {
        patchChildren(child, null, nvnode.el)
      })
      break
  }

  const pChildren = Array.isArray(pvnode.children) ? pvnode.children : [pvnode.children]
  pChildren.forEach(child => {
    if (child.flags === 'Portal') {
      (child.el || []).forEach(el => {
        el.parentNode.removeChild(el)
      })
    }
  })
}

function patchText(nvnode) {
  nvnode.el.innerHTML = nvnode.children
}

function patchChildren(nvnode, pvnode, container?) { // 处理子元素
  const { childrenFlags, children, el /* 父容器 */ } = nvnode || {}
  const { childrenFlags: pChildrenFlags, children: pChildren } = pvnode || {}

  if (!pvnode) {
    return mount(nvnode, container, nvnode.flags === 'Svg')
  }

  if (pChildrenFlags === 'NoChildren') {
    switch (childrenFlags) {
      case 'NoChildren':
        return
      case 'SingleChildren':
        return replaceVnode(nvnode, pvnode, pvnode.el)
      case 'MutilpleChildren':
        children.forEach(child => {
          patch(child, null, el)
        })
        return
      case 'Text':
        if (children.flags === 'Normal') {
          
        }
        return patchText(nvnode)
      default:
        return
    }
  } else if (pChildrenFlags === 'SingleChildren') {
    switch (childrenFlags) {
      case 'NoChildren':
        return removeElement(pvnode)
      case 'SingleChildren':
        return replaceVnode(nvnode, pvnode, pvnode.el)
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
        replaceVnode(nvnode, pvnode, pvnode.el)
        return
      case 'MutilpleChildren':
        console.log('el', el)
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
        return replaceVnode(nvnode, pvnode, pvnode.el.parentNode)
      case 'MutilpleChildren':
        replaceVnode(nvnode, pvnode)
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
    return replaceVnode(nvnode, pvnode, pvnode.el) // tag是每一个vnode的类型，当类型不同的情况下替换新旧节点
  } else {
    if (pvnode.flags === nvnode.flags) { // vnode.flags代表当前vnode类型
      nvnode.el = pvnode.el
      if (nvnode.flags === 'Normal' || nvnode.flags === 'Svg') {
        getAttributes(nvnode, pvnode)
      }
      patchChildren(nvnode, pvnode, nvnode.el)
    } else {
      return replaceVnode(nvnode, pvnode)
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