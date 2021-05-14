"use strict";
exports.__esModule = true;
function nextTick(callback) {
    if (Promise) {
        Promise.resolve().then(function () {
            callback();
        })["catch"](function (err) {
            console.error(err);
        });
    }
    else {
        setTimeout(function () {
            callback();
        }, 0);
    }
}
exports["default"] = nextTick;
