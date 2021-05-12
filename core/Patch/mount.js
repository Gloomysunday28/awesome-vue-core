"use strict";
exports.__esModule = true;
var render_1 = require("../Render/render");
var createElement_1 = require("./createElement");
function mountText(children, container, parent) {
    var el = document.createTextNode(children);
    console.log('p', parent);
    if (parent && parent.flags === 'Portal') {
        (parent.el || (parent.el = [])).push(el);
    }
    container.appendChild(el);
}
function mountElement(vnode, container, isSvg) {
    var children = vnode.children, childrenFlags = vnode.childrenFlags;
    var el = createElement_1.createElement(vnode, isSvg).el;
    createElement_1.mountChildren(children, el, childrenFlags, isSvg);
    container.appendChild(el);
}
function mountFragment(vnode, container) {
    var children = vnode.children, childrenFlags = vnode.childrenFlags;
    var fragment = document.createDocumentFragment();
    createElement_1.mountChildren(children, fragment, childrenFlags);
    switch (childrenFlags) {
        case 'MutilpleChildren':
            vnode.el = children[0].el;
            break;
        case 'SingleChildren':
            vnode.el = children.el;
            break;
        case 'Text':
            vnode.el = container;
            break;
        default:
            break;
    }
    container.appendChild(fragment);
}
function mountPortal(vnode) {
    var _a;
    var children = vnode.children, childrenFlags = vnode.childrenFlags, target = vnode.data.target;
    createElement_1.mountChildren(children, document.querySelector(target), childrenFlags, false, vnode);
    (_a = (vnode.el || (vnode.el = []))).push.apply(_a, (Array.isArray(children) ? children : [children]).map(function (vChild) { return vChild.el; }).filter(Boolean));
}
function mountStatusComponent(vnode, container) {
    var instance = new vnode.tag();
    var instanceVnode = instance.render(render_1["default"]);
    mount(instanceVnode, container);
    instance.$el = vnode.el = instanceVnode.el;
    instance.$vnode = instanceVnode;
    if (!instance.isMounted) {
        instance.mounted && instance.mounted(instance);
        instance.isMounted = true;
    }
}
function mountFunctionalComponent(vnode, container, isSvg) {
    var $vnode = vnode.tag();
    mount($vnode, container, isSvg);
    vnode.el = $vnode.el;
}
function mount(vnode, container, isSvg, parent) {
    var flags = vnode.flags;
    if (flags) {
        switch (flags) {
            case 'Normal':
            case 'Svg':
                mountElement(vnode, container, isSvg || flags === 'Svg');
                break;
            case 'Fragment':
                mountFragment(vnode, container);
                break;
            case 'Portal':
                mountPortal(vnode);
                break;
            case 'StatusComponent':
                mountStatusComponent(vnode, container);
                break;
            case 'FunctionalComponent':
                mountFunctionalComponent(vnode, container, isSvg || flags === 'Svg');
                break;
            default:
                break;
        }
    }
    else if (['number', 'string'].some(function (v) { return typeof vnode === v; })) {
        mountText(vnode, container, parent);
    }
}
exports["default"] = mount;
