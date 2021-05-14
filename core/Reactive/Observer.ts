import Dep from './Dep'

const catchSelfArrayApi = ['push', 'splice', 'sort', 'reverse', 'pop', 'shift', 'unshift']
class ObserverData {
  constructor(data, key, value) {
    const dep = new Dep()
    data.__ob__.dep = dep

    new Observer(value)
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get(): any {
        dep.addWatcher()

        return value
      },
      set(newValue) {
        if (value === newValue || (value !== value && newValue !== newValue)) return
        value = newValue
        new Observer(value)
        
        dep.notify()
      }
    })
  }
}

function proxyData(data, key, instance) {
  if (!instance) return void 0
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
  constructor(data, instance?) {
    if (Object.prototype.toString.call(data) !== '[object Object]' || !Array.isArray(data)) return void 0
    
    this.initData(data, instance)
  }
  initData(data, instance?) {
    data.__ob__ = {
      observer: this
    }
    for (let key in data) {
      if (key === '__ob__') continue
      
      proxyData(data, key, instance)
      if (Array.isArray(data)) {
        this.walkData(data)
      } else {
        new ObserverData(data, key, data[key])
      }
    }
  }
  walkData(data) {
    const dep = new Dep()
    data.__ob__.dep = dep

    catchSelfArrayApi.forEach(api => {
      const originFn = data[api]
      data[api] = function(...fields) {
        const rest = originFn.apply(null, arguments)
        
        switch (api) {
          case 'push':
          case 'unshift':
            new Observer(fields[0])
            break
          case 'splice':
            new Observer(fields[2])
            break
          default:
            break
        }
        dep.notify()
        return rest
      }
    })
  }
}