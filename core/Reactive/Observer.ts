import Dep from './Dep'

class ObserverData {
  constructor(data, key, value, observer) {
    const dep = new Dep()
    data.__ob__.dep = dep
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get(): any {
        dep.addWatcher()
        return value
      },
      set(newValue) {
        value = newValue
        observer(value)

        dep.notify()
      }
    })
  }
}

function proxyData(data, key, instance) {
  Object.defineProperty(instance, key, {
    get() {
      return data[key]
    },
    set(value) {
      data[key] = value
    }
  })
}

export default class Observer {
  constructor(data, instance) {
    if (Object.prototype.toString.call(data) !== '[object Object]') throw new Error(`
      [AweSomeVue]: data must be object!
    `)

    this.initData(data, instance)
  }
  initData(data, instance) {
    data.__ob__ = {}
    for (let key in data) {
      proxyData(data, key, instance)
      new ObserverData(data, key, data[key], this)
    }
  }
}