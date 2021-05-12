"use strict";
exports.__esModule = true;
var AweSomeVue_1 = require("../core/AweSomeVue");
var Fragment = Symbol('Fragment');
var Portal = Symbol('Portal');
var instance = new AweSomeVue_1["default"]({
    el: document.getElementsByTagName('div')[0],
    render: function (h) {
        return h('div', { staticClass: 'bem' }, h(Portal, { target: 'body' }, ['oldChildren', h('nav', null, 'oldChildren2')]));
    }
});
setTimeout(function () {
    instance.init({
        el: instance.$el,
        render: function (h) {
            return h('div', { staticClass: 'bem' }, h(Portal, { target: 'body' }, [h('div', null, 'newChildren'), 'newChildren2']));
        }
    });
}, 1500);
