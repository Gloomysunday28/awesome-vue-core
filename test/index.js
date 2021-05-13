"use strict";
exports.__esModule = true;
var AweSomeVue_1 = require("../core/AweSomeVue");
var Fragment = Symbol('Fragment');
var Portal = Symbol('Portal');
var App = {
    name: 'App',
    render: function (h) {
        return h('input', { value: 'App' }, 'App');
    }
};
var instance = new AweSomeVue_1["default"]({
    el: document.getElementsByTagName('div')[0],
    render: function (h) {
        return h('div', { staticClass: 'bem' }, h(Fragment, null, 'oldCHildren'));
    }
});
setTimeout(function () {
    App.render = function (h) {
        return h('input', { value: 'App2' }, null);
    };
    instance.init({
        el: instance.$el,
        render: function (h) {
            return h('div', { staticClass: 'bem' }, h(Fragment, null, 'oldCHildren'));
        }
    });
}, 1500);
