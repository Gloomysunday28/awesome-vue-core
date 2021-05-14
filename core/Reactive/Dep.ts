export default class Dep {
  subs = []
  constructor() {}
  addWatcher(): void {
    if (this.subs.includes((window as any).globalWatcher)) return void

    (window as any).globalWatcher.addDep(this)
    this.subs.push((window as any).globalWatcher)
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update()
    })
  }
}
