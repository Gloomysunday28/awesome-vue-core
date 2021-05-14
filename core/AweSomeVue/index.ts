import h from '../Render/render'
import renderAweSomeVue from '../Patch'
import Component from '../Component/component'

function AweSomeVue(option): void {
  if (!this || this.constructor !== AweSomeVue) throw new Error('[AweSomeVue]: Please new Function~')
  
  this.init(option)
}

AweSomeVue.extend = function(option) {
  class SuperVue extends Component {
    constructor() {
      super()
      Object.assign(this, option)
    }
  }

  SuperVue.prototype = option
  return SuperVue
}

AweSomeVue.prototype.init = function(option) {
  const vnode = option.render(h)
  this.renderAweSomeVue(vnode, option.el, this)
  
  this.$vnode = vnode
  this.$el = vnode.el
  this.$option = option
  if (!this.isMounted) {
    option.mounted && option.mounted(this)
    this.isMounted = true
  }

  return vnode
}

AweSomeVue.prototype.renderAweSomeVue = renderAweSomeVue

export default AweSomeVue