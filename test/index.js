"use strict";
exports.__esModule = true;
var AweSomeVue_1 = require("../core/AweSomeVue");
var instance = new AweSomeVue_1["default"]({
    el: document.getElementsByTagName('div')[0],
    render: function (h) {
        return h('div', null, null);
    }
});
setTimeout(function () {
    instance.init({
        el: instance.$el,
        render: function (h) {
            return h('div', null, h('div', null, h('div', null, '2313')));
        }
    });
}, 1500);
