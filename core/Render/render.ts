import { ComponentTypes } from '../Component/types/Component.type'
import { Vnode } from '../Vnode/vnode'

export default function h(tag: ComponentTypes | string | null, data, children) {
  const vnode = new Vnode(tag, data, children)

  return vnode
}