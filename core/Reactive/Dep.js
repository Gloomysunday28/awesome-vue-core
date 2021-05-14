"use strict";
exports.__esModule = true;
var Dep = /** @class */ (function () {
    function Dep() {
        this.subs = [];
    }
    Dep.prototype.addWatcher = function () {
        if (this.subs.includes(window.globalWatcher))
            return void window.globalWatcher.addDep(this);
        this.subs.push(window.globalWatcher);
    };
    Dep.prototype.notify = function () {
        this.subs.forEach(function (watcher) {
            watcher.update();
        });
    };
    return Dep;
}());
exports["default"] = Dep;
