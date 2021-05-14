import { mountChildren, mountElement, mountFragment, mountPortal, mountText } from './createElement'
import { mountFunctionalComponent, mountStatusComponent } from './createComponent'

export default function mount(vnode, container, isSvg?, parent?) { // 渲染虚拟Dom
  const flags = vnode.flags
  isSvg = isSvg || flags === 'Svg'
  
  if (flags) {
    switch(flags) {
      case 'Normal':
      case 'Svg':
        mountChildren(vnode.children, mountElement(vnode, container, isSvg), vnode.childrenFlags, isSvg)
        break
      case 'Fragment':
        mountFragment(vnode, container)
        break
      case 'Portal':
        mountPortal(vnode)
        break
      case 'StatusComponent':
        mount(mountStatusComponent(vnode), container)
        break
      case 'FunctionalComponent':
        mount(mountFunctionalComponent(vnode), container, isSvg)
        break
      default:
        break
    }
  } else if (['number', 'string'].some(v => typeof vnode === v)) {
    mountText(vnode, container, parent)
  }
}