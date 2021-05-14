"use strict";
exports.__esModule = true;
var Dep_1 = require("./Dep");
var catchSelfArrayApi = ['push', 'splice', 'sort', 'reverse', 'pop', 'shift', 'unshift'];
var ObserverData = /** @class */ (function () {
    function ObserverData(data, key, value) {
        var dep = new Dep_1["default"]();
        data.__ob__.dep = dep;
        new Observer(value);
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                dep.addWatcher();
                return value;
            },
            set: function (newValue) {
                if (value === newValue || (value !== value && newValue !== newValue))
                    return;
                value = newValue;
                new Observer(value);
                dep.notify();
            }
        });
    }
    return ObserverData;
}());
function proxyData(data, key, instance) {
    if (!instance)
        return void 0;
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
        if (Object.prototype.toString.call(data) !== '[object Object]' || !Array.isArray(data))
            return void 0;
        this.initData(data, instance);
    }
    Observer.prototype.initData = function (data, instance) {
        data.__ob__ = {
            observer: this
        };
        for (var key in data) {
            if (key === '__ob__')
                continue;
            proxyData(data, key, instance);
            if (Array.isArray(data)) {
                this.walkData(data);
            }
            else {
                new ObserverData(data, key, data[key]);
            }
        }
    };
    Observer.prototype.walkData = function (data) {
        var dep = new Dep_1["default"]();
        data.__ob__.dep = dep;
        catchSelfArrayApi.forEach(function (api) {
            var originFn = data[api];
            data[api] = function () {
                var fields = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    fields[_i] = arguments[_i];
                }
                var rest = originFn.apply(null, arguments);
                switch (api) {
                    case 'push':
                    case 'unshift':
                        new Observer(fields[0]);
                        break;
                    case 'splice':
                        new Observer(fields[2]);
                        break;
                    default:
                        break;
                }
                dep.notify();
                return rest;
            };
        });
    };
    return Observer;
}());
exports["default"] = Observer;
