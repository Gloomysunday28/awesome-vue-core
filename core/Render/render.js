"use strict";
exports.__esModule = true;
var vnode_1 = require("../Vnode/vnode");
function h(tag, data, children) {
    var vnode = new vnode_1.Vnode(tag, data, children);
    return vnode;
}
exports["default"] = h;
