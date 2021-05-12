"use strict";
exports.__esModule = true;
var mount_1 = require("./mount");
var patch_1 = require("./patch");
function renderAweSomeVue(vnode, container, context) {
    console.log(context);
    if (context.$vnode) {
        patch_1["default"](vnode, context.$vnode, context.$el);
    }
    else {
        mount_1["default"](vnode, container);
    }
}
exports["default"] = renderAweSomeVue;
