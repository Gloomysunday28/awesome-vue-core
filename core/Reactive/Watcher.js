"use strict";
exports.__esModule = true;
var Watcher = /** @class */ (function () {
    function Watcher(getter, option) {
        this.deps = [];
        this.getter = null;
        window.globalWatcher = this;
        this.getter = getter;
        if (typeof getter === 'function') {
            return getter();
        }
    }
    Watcher.prototype.addDep = function (dep) {
        if (this.deps.includes(dep))
            return void 0;
        this.deps.push(dep);
    };
    Watcher.prototype.update = function () {
        this.getter();
    };
    return Watcher;
}());
exports["default"] = Watcher;
