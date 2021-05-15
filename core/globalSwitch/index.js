"use strict";
exports.__esModule = true;
exports.setShallow = exports.setFlushCallback = void 0;
window.canFlushCallback = true;
window.shallow = true;
function setFlushCallback() {
    window.canFlushCallback = !window.canFlushCallback;
}
exports.setFlushCallback = setFlushCallback;
function setShallow() {
    window.shallow = !window.shallow;
}
exports.setShallow = setShallow;
