"use strict";
exports.__esModule = true;
var createElement_1 = require("./createElement");
function mount(vnode, container, isSvg, parent) {
    var flags = vnode.flags;
    isSvg = isSvg || flags === 'Svg';
    var children = vnode.children, childrenFlags = vnode.childrenFlags;
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
                mount(createElement_1.mountStatusComponent(vnode), container);
                break;
            case 'FunctionalComponent':
                mount(createElement_1.mountFunctionalComponent(vnode), container, isSvg);
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
