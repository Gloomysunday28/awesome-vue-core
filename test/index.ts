import AweSomeVue from '../core/AweSomeVue'

const Fragment = Symbol('Fragment')
const Portal = Symbol('Portal')
const App = {
  name: 'App',
  data() {
    return {
      stars: [1, 2, 3]
    }
  },
  mounted(){
    setTimeout(() => {
      this.stars.push(4)
    }, 1500)
    console.log('mounted')
  },
  updated() {
    console.log('updated')
  },
  render(h) {
    return h('div', {value: this.$props.text}, this.stars.map(v => v))
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
