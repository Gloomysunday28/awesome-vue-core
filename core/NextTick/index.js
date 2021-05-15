"use strict";
exports.__esModule = true;
var nextTick_1 = require("./nextTick");
var globalSwitch_1 = require("../globalSwitch");
var canFlushCallback = window.canFlushCallback;
function flushCallbacks() {
    if (!canFlushCallback)
        return;
    var callbacks = window.callbacks;
    globalSwitch_1.setFlushCallback();
    if (callbacks && Array.isArray(callbacks)) {
        callbacks.sort(function (a, b) { return a.uid - b.uid ? -1 : 1; });
        Promise.resolve().then(function () {
            var callback = null;
            while (callback = callbacks.shift()) {
                nextTick_1["default"](callback);
            }
            globalSwitch_1.setFlushCallback();
        });
    }
}
exports["default"] = flushCallbacks;
