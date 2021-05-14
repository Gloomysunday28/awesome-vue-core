import nextTick from './nextTick'
var canFlushCallback = true
export default function flushCallbacks() {
  if (!canFlushCallback) return 
  
  const callbacks = (window as any).callbacks
  canFlushCallback = false
  if (callbacks && Array.isArray(callbacks)) {
    callbacks.sort((a, b) => a.uid - b.uid ? -1 : 1)
    Promise.resolve().then(() => {
      var callback = null
      while (callback = callbacks.shift()) {
        nextTick(callback)
      }
      canFlushCallback = true
    })
  }
}

