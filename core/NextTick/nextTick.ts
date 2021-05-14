export default function nextTick(callback) {
  if (Promise) {
    Promise.resolve().then(() => {  
      callback()
    }).catch(err => {
      console.error(err)
    })
  } else {
    setTimeout(() => {
      callback()
    }, 0)
  }
}