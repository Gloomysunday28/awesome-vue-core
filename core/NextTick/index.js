"use strict";
exports.__esModule = true;
var nextTick_1 = require("./nextTick");
var canFlushCallback = true;
function flushCallbacks() {
    if (!canFlushCallback)
        return;
    var callbacks = window.callbacks;
    canFlushCallback = false;
    if (callbacks && Array.isArray(callbacks)) {
        callbacks.sort(function (a, b) { return a.uid - b.uid ? -1 : 1; });
        Promise.resolve().then(function () {
            var callback = null;
            while (callback = callbacks.shift()) {
                nextTick_1["default"](callback);
            }
            canFlushCallback = true;
        });
    }
}
exports["default"] = flushCallbacks;
