import { ComponentTypes } from './types/Component.type'

export default class Component implements ComponentTypes {
  constructor() {}
  render(): never {
    throw new Error('Component get no render function')
  }
}