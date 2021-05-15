import nextTick from './nextTick'
import { setFlushCallback } from '../globalSwitch'

const canFlushCallback = (window as any).canFlushCallback
export default function flushCallbacks() {
  if (!canFlushCallback) return 
  
  const callbacks = (window as any).callbacks
  setFlushCallback()
  if (callbacks && Array.isArray(callbacks)) {
    callbacks.sort((a, b) => a.uid - b.uid ? -1 : 1)
    Promise.resolve().then(() => {
      var callback = null
      while (callback = callbacks.shift()) {
        nextTick(callback)
      }
      setFlushCallback()
    })
  }
}

