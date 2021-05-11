import h from '../Render/render'
import mount from '../Patch/mount'
import Component from '../Component/component'

function AweSomeVue(option) {
  const vnode = option.render(h)
  mount(vnode, option.el)

  return vnode
}

AweSomeVue.extend = function(option) {
  class SuperVue extends Component {
    constructor() {
      super()
      Object.assign(this, option)
    }
  }

  return SuperVue
}

export default AweSomeVue