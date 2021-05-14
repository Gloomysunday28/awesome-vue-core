var uid = 0
export default class Watcher {
  uid = uid++
  deps = []
  getter: any = null
  constructor(getter, option) {
    (window as any).globalWatcher = this
    this.getter = getter
    if (typeof getter === 'function') {
      return getter()
    }
    (window as any).globalWatcher = null
  }
  addDep(dep): void {
    if (this.deps.includes(dep)) return void 0

    this.deps.push(dep)
  }
  update() {
    ((window as any).callbacks || ((window as any).callbacks = [])).push(this.getter)
  }
}
