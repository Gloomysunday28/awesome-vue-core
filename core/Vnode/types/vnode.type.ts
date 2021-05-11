import { ComponentTypes } from '../../Component/types/Component.type'

export enum VnodeFlags {
  Normal, // 常规html
  Svg, // svg标签
  StatusComponent, // 有状态组价
  FunctionalComponent, // 函数式组件
  Text, // 文本节点
  Fragment, // 文档碎片
  Portal // 指定挂载容器的节点
}

export enum ChildrenFlags {
  NoChildren,
  MutilpleChildren,
  SingleChildren,
  Text
}

export declare interface VnodeTypes {
  tag: string | ComponentTypes,
  children: VnodeTypes | Array<VnodeTypes | string> | null,
  flags: keyof typeof VnodeFlags | null,
  data: {
    [propsName: string]: any
  } | null,
  slots: {
    [propsName: string]: VnodeTypes | Array<VnodeTypes | string> | null,
  } | null,
  childrenFlags: keyof typeof ChildrenFlags | null,
  el?: HTMLElement
}