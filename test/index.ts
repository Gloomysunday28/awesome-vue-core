import AweSomeVue from '../core/AweSomeVue'

const Fragment = Symbol('Fragment')
const Portal = Symbol('Portal')
const App = {
  name: 'App',
  data() {
    return {
      stars: [{name: 1}]
    }
  },
  mounted(){
    setTimeout(() => {
      this.text = 2
    }, 1500)
  },
  updated() {
    console.log('updated')
  },
  render(h) {
    console.log(this)
    return h('div', {value: this.stars.map(v => v.name).join('')}, this.text)
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
