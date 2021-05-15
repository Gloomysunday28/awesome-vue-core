(window as any).canFlushCallback = true;
(window as any).shallow = false;

export function setFlushCallback() {
  (window as any).canFlushCallback = !(window as any).canFlushCallback
}

export function setShallow() {
  (window as any).shallow = !(window as any).shallow
}