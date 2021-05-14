import { removeDupSpaces } from '../../utils'
import AweSomeVue from '../AweSomeVue'
import h from '../Render/render'
import { VnodeTypes } from './types/vnode.type'

function getFlags(tag, data) {
  if (typeof tag === 'string') {
    if (tag !== 'svg') {
      return 'Normal'
    } else {
      return 'Svg'
    }
  } else if (typeof tag === 'function') {
    if (tag.prototype && tag.prototype.render) {
      return 'StatusComponent'
    } else {
      return 'FunctionalComponent'
    }
  } else if (typeof tag === 'symbol') {
    if (data && data.target) {
      return 'Portal'
    } else {
      return 'Fragment'
    }
  } else {
    return 'Text'
  }
}

function getChildrenFlags(children) {
  if (Array.isArray(children)) {
    return 'MutilpleChildren'
  } else if (Object.prototype.toString.call(children) === '[object Object]') {
    return 'SingleChildren'
  } else if (typeof children === 'string') {
    return 'Text'
  } else {
    return 'NoChildren'
  }
}

function getTransfromClass(staticClass) {
  if (staticClass === null) return null
  
  const type = typeof staticClass
  if (type === 'string') return staticClass
  else if (type === 'object') {
    if (Array.isArray(staticClass)) {
      return staticClass.reduce((prev, next) => {
        return prev += ` ${getTransfromClass(next)}`
      }, '')
    } else if (Object.prototype.toString.call(staticClass) === '[object Object]') {
      return Object.keys(staticClass).reduce((prev, next) => {
        return prev + (staticClass[next] ? ` ${next}` : '')
      }, '')
    } else {
      return null
    }
  }

  return staticClass || ''
}

function getTransfromData(data) {
  const { staticClass } = data || {}
  ;(data || {}).staticClass = removeDupSpaces(getTransfromClass(staticClass))
  
  return data
}

function createFunctionalComponent(option) {
  return function() {
    return option.render(h)
  }
}

export class Vnode implements VnodeTypes {
  constructor(tag, data, children) {
    console.log(children)
    this.tag = typeof tag === 'object' ? (tag.functional ? createFunctionalComponent(tag) : AweSomeVue.extend(tag)) : tag
    this.data = getTransfromData(data)
    this.children = children
    this.flags = getFlags(this.tag, data)
    this.childrenFlags = getChildrenFlags(children)
  }
  tag = null
  data = null
  children = null
  slots = null
  flags = null
  childrenFlags = null
}