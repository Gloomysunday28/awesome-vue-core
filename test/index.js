"use strict";
exports.__esModule = true;
var AweSomeVue_1 = require("../core/AweSomeVue");
var Fragment = Symbol('Fragment');
var Portal = Symbol('Portal');
var App = {
    name: 'App',
    data: function () {
        return {
            stars: [1, 2, 3]
        };
    },
    mounted: function () {
        var _this = this;
        setTimeout(function () {
            _this.stars.push(4);
        }, 1500);
        console.log('mounted');
    },
    updated: function () {
        console.log('updated');
    },
    render: function (h) {
        return h('div', { value: this.$props.text }, this.stars.map(function (v) { return v; }));
    }
};
var instance = new AweSomeVue_1["default"]({
    el: document.getElementsByTagName('div')[0],
    render: function (h) {
        return h('div', { staticClass: 'bem' }, h(App, { props: { text: 'text' } }, null));
    }
});
// setTimeout(() => {
//   App.render = function(h) {
//     console.log(this.$props)
//     return h('input', { value: this.$props.text }, null)
//   }
//   instance.init({
//     el: instance.$el,
//     render(h) {
//       return h('div', { staticClass: 'bem' }, h(App, { props: { text: 'text' } }, null))
//     }
//   })
// }, 1500)
