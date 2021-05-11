import { VnodeTypes } from '../../Vnode/types/vnode.type'

interface MethodsTypes {
  [params: string]: () => any
}

export interface ComponentTypes {
  name?: string,
  data?: () => object,
  mounted?: () => any,
  created?: () => any,
  methods?: () => MethodsTypes,
  render: () => never | VnodeTypes[] | VnodeTypes | null
}