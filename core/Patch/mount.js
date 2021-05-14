"use strict";
exports.__esModule = true;
var createElement_1 = require("./createElement");
var createComponent_1 = require("./createComponent");
function mount(vnode, container, isSvg, parent) {
    var flags = vnode.flags;
    isSvg = isSvg || flags === 'Svg';
    if (flags) {
        switch (flags) {
            case 'Normal':
            case 'Svg':
                createElement_1.mountChildren(vnode.children, createElement_1.mountElement(vnode, container, isSvg), vnode.childrenFlags, isSvg);
                break;
            case 'Fragment':
                createElement_1.mountFragment(vnode, container);
                break;
            case 'Portal':
                createElement_1.mountPortal(vnode);
                break;
            case 'StatusComponent':
                mount(createComponent_1.mountStatusComponent(vnode), container);
                break;
            case 'FunctionalComponent':
                mount(createComponent_1.mountFunctionalComponent(vnode), container, isSvg);
                break;
            default:
                break;
        }
    }
    else if (['number', 'string'].some(function (v) { return typeof vnode === v; })) {
        createElement_1.mountText(vnode, container, parent);
    }
}
exports["default"] = mount;
