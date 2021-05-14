"use strict";
exports.__esModule = true;
var Dep_1 = require("./Dep");
var ObserverData = /** @class */ (function () {
    function ObserverData(data, key, value, observer) {
        var dep = new Dep_1["default"]();
        data.__ob__.dep = dep;
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                dep.addWatcher();
                return value;
            },
            set: function (newValue) {
                value = newValue;
                observer(value);
                dep.notify();
            }
        });
    }
    return ObserverData;
}());
function proxyData(data, key, instance) {
    Object.defineProperty(instance, key, {
        get: function () {
            return data[key];
        },
        set: function (value) {
            data[key] = value;
        }
    });
}
var Observer = /** @class */ (function () {
    function Observer(data, instance) {
        if (Object.prototype.toString.call(data) !== '[object Object]')
            throw new Error("\n      [AweSomeVue]: data must be object!\n    ");
        this.initData(data, instance);
    }
    Observer.prototype.initData = function (data, instance) {
        data.__ob__ = {};
        for (var key in data) {
            proxyData(data, key, instance);
            new ObserverData(data, key, data[key], this);
        }
    };
    return Observer;
}());
exports["default"] = Observer;
