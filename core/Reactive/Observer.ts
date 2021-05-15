import Dep from './Dep'

const catchSelfArrayApi = ['push', 'splice', 'sort', 'reverse', 'pop', 'shift', 'unshift']
const originArrayApi = ['map', 'forEach', 'filter', 'concat', 'some', 'every']
const shallow = (window as any).shallow
class ObserverData {
  constructor(data, key, value, dep) {
    if (!shallow) {
      new Observer(value, null, dep)
    }

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
        if (!shallow) {
          new Observer(value, null, dep)
        }
        
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
    var catchApis = {}
    catchSelfArrayApi.forEach(api => {
      const originFn = data[api].bind(data)
      catchApis[api] = function(...fields) {
        const rest = originFn.apply(null, fields)
  
        switch (api) {
          case 'push':
          case 'unshift':
            fields.forEach(filed => {
              new Observer(filed)
            })

            break
          case 'splice':
            fields = fields.slice(2)

            fields.forEach(filed => {
              new Observer(filed)
            })
            break
          default:
            break
        }

        dep.notify()
        return rest
      }
    })

    originArrayApi.forEach(api => {
      const originFn = data[api].bind(data)
      catchApis[api] = function(...fields) {
        const rest = originFn.apply(null, fields)
        
        dep.addWatcher()
        return rest
      }
    })
    
    Object.setPrototypeOf(catchApis, Array.prototype)
    Object.setPrototypeOf(data, catchApis)

    for (let n = data.length, i = n - 1; i >= 0; i--) {
      new Observer(data[i], null, dep)
    }
  }
}