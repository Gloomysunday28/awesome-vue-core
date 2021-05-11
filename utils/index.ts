export function getHumpTransform(string: string) {
  return string.replace(/-(.*)/g, function(c) {
    return c.toUpperCase()
  })
}

export function getHumpTransformReverse(string: string): string {
  return string.replace(/[A-Z]/g, function(c) {
    return '-' + c.toLowerCase()
  })
}


export function removeDupSpaces(string: string): string {
  return string.replace(/\s+/g, ' ')
}