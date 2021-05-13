"use strict";
exports.__esModule = true;
var render_1 = require("../Render/render");
var createElement_1 = require("./createElement");
var mount_1 = require("./mount");
function addVnode(nvnode, pvnode, container) {
    if (pvnode === void 0) { pvnode = {}; }
    switch (nvnode.flags) {
        case 'Normal':
            patchChildren(nvnode, pvnode, container);
            break;
        case 'Text':
            if (nvnode.children !== pvnode.children) {
                nvnode.el.innerHTML = nvnode.children;
            }
            break;
        default:
            break;
    }
}
function removeVnode(vnode) {
    var el = vnode.el;
    switch (vnode.flags) {
        case 'Text':
            break;
        case 'Normal':
            el.parentNode.removeChild(el);
            break;
        default:
            break;
    }
}
function removeElement(vnode) {
    var el = vnode.el;
    el.parentNode.removeChild(el);
}
function replaceVnode(nvnode, pvnode, contianer) {
    if (nvnode.tag === pvnode.tag) {
        nvnode.el = pvnode.el;
    }
    else {
        removeVnode(pvnode);
        addVnode(nvnode, null, contianer); // 这里会创建nvnode.el, 并且不会执行patchChildren, 这里将Children的收集放置到下面处理
        var pChildren = Array.isArray(pvnode.children) ? pvnode.children : [pvnode.children];
        pChildren.forEach(function (child) {
            if (child && child.flags === 'Portal') {
                (child.el || []).forEach(function (el) {
                    el.parentNode.removeChild(el);
                });
            }
        });
    }
    console.log('nvnode', nvnode);
    console.log('pvnode', pvnode);
    switch (nvnode.childrenFlags) {
        case 'Text':
            nvnode.el.innerHTML = nvnode.children;
            break;
        case 'SingleChildren':
            patchChildren(nvnode.children, pvnode.children, nvnode.el);
            break;
        default:
            var children = nvnode.children;
            children.forEach(function (child) {
                patchChildren(child, pvnode.children, nvnode.el);
            });
            break;
    }
}
function patchText(nvnode) {
    if (nvnode.flags === 'Portal') {
        var el = nvnode.el[0];
        var text = document.createTextNode(nvnode.children);
        el.parentNode.insertBefore(text, el);
        el.remove();
    }
    else {
        nvnode.el.innerHTML = nvnode.children;
    }
}
function patchChildren(nvnode, pvnode, container) {
    var _a = nvnode || {}, childrenFlags = _a.childrenFlags, children = _a.children, el = _a.el /* 父容器 */;
    var _b = pvnode || {}, pChildrenFlags = _b.childrenFlags, pChildren = _b.children;
    if (!pvnode) {
        return mount_1["default"](nvnode, container, nvnode.flags === 'Svg');
    }
    if (pChildrenFlags === 'NoChildren') {
        switch (childrenFlags) {
            case 'NoChildren': // 两种情况， 一是都是组件类型, 而是没有children
                if (pvnode.flags.includes('Component') && nvnode.flags.includes('Component')) {
                    nvnode = new (nvnode.tag()).render(render_1["default"]);
                    patch(nvnode, pvnode.instance.$vnode);
                }
                return;
            case 'SingleChildren':
                return replaceVnode(nvnode, pvnode, pvnode.el);
            case 'MutilpleChildren':
                children.forEach(function (child) {
                    patch(child, null, el);
                });
                return;
            case 'Text':
                if (children.flags === 'Normal') {
                }
                return patchText(nvnode);
            default:
                return;
        }
    }
    else if (pChildrenFlags === 'SingleChildren') {
        switch (childrenFlags) {
            case 'NoChildren':
                return removeElement(pvnode);
            case 'SingleChildren':
                return replaceVnode(nvnode, pvnode, pvnode.el);
            case 'MutilpleChildren':
                children.forEach(function (child) {
                    patch(child, pChildren, el);
                });
                return;
            case 'Text':
                nvnode.el = pvnode.el;
                return patchText(nvnode);
            default:
                return;
        }
    }
    else if (pChildrenFlags === 'MutilpleChildren') {
        switch (childrenFlags) {
            case 'NoChildren':
                pChildren.forEach(function (child) {
                    removeVnode(child);
                });
                return;
            case 'SingleChildren':
                replaceVnode(nvnode, pvnode, pvnode.el);
                return;
            case 'MutilpleChildren':
                console.log('el', el);
                children.forEach(function (child) {
                    patch(child, null, el);
                });
                pChildren.forEach(function (child) {
                    removeVnode(child);
                });
                return;
            case 'Text':
                nvnode.el = pvnode.el;
                return patchText(nvnode);
            default:
                return;
        }
    }
    else if (pChildrenFlags === 'Text') {
        switch (childrenFlags) {
            case 'NoChildren':
                removeVnode(pChildren);
                return;
            case 'SingleChildren':
                return replaceVnode(nvnode, pvnode, pvnode.el.parentNode);
            case 'MutilpleChildren':
                replaceVnode(nvnode, pvnode);
                return;
            case 'Text':
                nvnode.el = pvnode.el;
                if (pChildren === children)
                    return;
                return patchText(nvnode);
            default:
                return;
        }
    }
}
function patchElement(nvnode, pvnode) {
    if (pvnode.tag !== nvnode.tag) {
        return replaceVnode(nvnode, pvnode, pvnode.el); // tag是每一个vnode的类型，当类型不同的情况下替换新旧节点
    }
    else {
        if (pvnode.flags === nvnode.flags) { // vnode.flags代表当前vnode类型
            nvnode.el = pvnode.el;
            if (nvnode.flags === 'Normal' || nvnode.flags === 'Svg') {
                createElement_1.getAttributes(nvnode, pvnode);
            }
            patchChildren(nvnode, pvnode, nvnode.el);
        }
        else {
            return replaceVnode(nvnode, pvnode);
        }
    }
}
function patch(nvnode, pvnode, container) {
    if (pvnode) {
        if (nvnode) {
            nvnode.el = pvnode.el;
            patchElement(nvnode, pvnode);
        }
        else {
            removeVnode(pvnode); // 若是新节点不存在旧节点存在，那么删除旧节点
        }
    }
    else {
        addVnode(nvnode, null, container);
    }
}
exports["default"] = patch;
