import AweSomeVue from '../core/AweSomeVue'

AweSomeVue({
  el: document.getElementsByTagName('div')[0],
  render(h) {
    return h('div', {
      styles: {
        color: 'red',
        fontSize: 14,
      },
      staticClass: ['bem', '1231', ['333'], { object: true }]
    }, [h('input', {
      value: 'input',
      on: {
        focus() {
          console.log('focus')
        }
      }
    }, '123112'), h('div', null, h('input', {
      type: 'checkbox',
      checked: false
    }, '222')), h('input', {
      type: 'radio',
      checked: true
    }, null),
    h(Symbol('Fragment'), null, h('div', null, 'Fragment')),
    h(Symbol('Portal'), {
      target: '.app'
    }, '31321'),
    h('svg', {}, h('circle')),
    h({
      name: 'Martin',
      render(h) {
        return h('div', null, 'martin')
      }
    }, null, null),
    h({
      name: 'Functional',
      functional: true,
      render(h) {
        return h('div', null, 'functional')
      }
    })
    ])
  }
})