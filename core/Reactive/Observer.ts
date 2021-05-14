import Dep from './Dep'

const catchSelfArrayApi = ['push', 'splice', 'sort', 'reverse', 'pop', 'shift', 'unshift']
class ObserverData {
  constructor(data, key, value, dep) {
    new Observer(value, null, dep)
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get(): any {
        console.log(1111)
        dep.addWatcher()

        return value
      },
      set(newValue) {
        if (value === newValue || (value !== value && newValue !== newValue)) return
        value = newValue
        new Observer(value, null, dep)
        
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
  constructor(data, instance?, dep?) {
    if (typeof data !== 'object') return void 0
    dep = dep || new Dep()
    data.__ob__ = {
      observer: this,
      dep
    }

    this.initData(data, instance, dep)
  }
  initData(data, instance?, dep?) {
    for (let key in data) {
      if (key === '__ob__') continue
      
      proxyData(data, key, instance)
      if (Array.isArray(data[key])) {
        this.walkData(data[key], dep)
      } else {
        new ObserverData(data, key, data[key], dep)
      }
    }
  }
  walkData(data, dep) {
    console.log(11, dep)
    catchSelfArrayApi.forEach(api => {
      const originFn = data[api].bind(data)
      data[api] = function(...fields) {
        const rest = originFn.apply(null, fields)

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