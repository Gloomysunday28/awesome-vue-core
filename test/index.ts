import AweSomeVue from '../core/AweSomeVue'

const Fragment = Symbol('Fragment')
const Portal = Symbol('Portal')
const App = {
  name: 'App',
  data() {
    return {
      count:1
    }
  },
  mounted(){
    setTimeout(() => {
      this.$props.text = 'text1'
      this._update()
    }, 1500)
    console.log('mounted')
  },
  updated() {
    console.log('updated')
  },
  render(h) {
    return h('div', {value: this.$props.text}, this.$props.text)
  }
}
const instance = new AweSomeVue({
  el: document.getElementsByTagName('div')[0],
  render(h) {
    return h('div', { staticClass: 'bem' }, h(App, { props: { text: 'text' } }, null))
  }
})
// setTimeout(() => {
//   App.render = function(h) {
//     console.log(this.$props)
//     return h('input', { value: this.$props.text }, null)
//   }
//   instance.init({
//     el: instance.$el,
//     render(h) {
//       return h('div', { staticClass: 'bem' }, h(App, { props: { text: 'text' } }, null))
//     }
//   })
// }, 1500)
