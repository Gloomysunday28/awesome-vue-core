"use strict";
exports.__esModule = true;
var uid = 0;
var Watcher = /** @class */ (function () {
    function Watcher(getter, option) {
        this.uid = uid++;
        this.deps = [];
        this.getter = null;
        window.globalWatcher = this;
        this.getter = getter;
        if (typeof getter === 'function') {
            return getter();
        }
        window.globalWatcher = null;
    }
    Watcher.prototype.addDep = function (dep) {
        if (this.deps.includes(dep))
            return void 0;
        this.deps.push(dep);
    };
    Watcher.prototype.update = function () {
        (window.callbacks || (window.callbacks = [])).push(this.getter);
    };
    return Watcher;
}());
exports["default"] = Watcher;
