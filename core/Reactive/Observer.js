"use strict";
exports.__esModule = true;
var Dep_1 = require("./Dep");
var catchSelfArrayApi = ['push', 'splice', 'sort', 'reverse', 'pop', 'shift', 'unshift'];
var originArrayApi = ['map', 'forEach', 'filter', 'concat', 'some', 'every'];
var ObserverData = /** @class */ (function () {
    function ObserverData(data, key, value, dep) {
        new Observer(value, null, dep);
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
                new Observer(value, null, dep);
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
    function Observer(data, instance, dep) {
        if (typeof data !== 'object')
            return void 0;
        dep = dep || new Dep_1["default"]();
        data.__ob__ = {
            observer: this,
            dep: dep
        };
        this.initData(data, instance, dep);
    }
    Observer.prototype.initData = function (data, instance, dep) {
        for (var key in data) {
            if (key === '__ob__')
                continue;
            proxyData(data, key, instance);
            if (Array.isArray(data[key])) {
                this.walkData(data[key], dep);
            }
            else {
                new ObserverData(data, key, data[key], dep);
            }
        }
    };
    Observer.prototype.walkData = function (data, dep) {
        var catchApis = {};
        catchSelfArrayApi.forEach(function (api) {
            var originFn = data[api].bind(data);
            catchApis[api] = function () {
                var fields = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    fields[_i] = arguments[_i];
                }
                var rest = originFn.apply(null, fields);
                switch (api) {
                    case 'push':
                    case 'unshift':
                        fields.forEach(function (filed) {
                            new Observer(filed);
                        });
                        break;
                    case 'splice':
                        fields = fields.slice(2);
                        fields.forEach(function (filed) {
                            new Observer(filed);
                        });
                        break;
                    default:
                        break;
                }
                dep.notify();
                return rest;
            };
        });
        originArrayApi.forEach(function (api) {
            var originFn = data[api].bind(data);
            catchApis[api] = function () {
                var fields = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    fields[_i] = arguments[_i];
                }
                var rest = originFn.apply(null, fields);
                dep.addWatcher();
                return rest;
            };
        });
        Object.setPrototypeOf(catchApis, Array.prototype);
        Object.setPrototypeOf(data, catchApis);
        for (var n = data.length, i = n - 1; i >= 0; i--) {
            new Observer(data[i], null, dep);
        }
    };
    return Observer;
}());
exports["default"] = Observer;
