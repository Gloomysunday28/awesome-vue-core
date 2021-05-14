export default class Watcher {
  deps = []
  getter: any = null
  constructor(getter, option) {
    (window as any).globalWatcher = this
    this.getter = getter
    if (typeof getter === 'function') {
      return getter()
    }
  }
  addDep(dep): void {
    if (this.deps.includes(dep)) return void 0

    this.deps.push(dep)
  }
  update() {
    this.getter()
  }
}
