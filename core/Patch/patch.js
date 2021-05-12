"use strict";
exports.__esModule = true;
var createElement_1 = require("./createElement");
function addVnode(nvnode, pvnode, container) {
    if (pvnode === void 0) { pvnode = {}; }
    switch (nvnode.flags) {
        case 'Normal':
            addElement(nvnode, pvnode, container);
            console.log(nvnode);
            console.log('p', pvnode);
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
function addElement(nvnode, pvnode, container) {
    var el = createElement_1.createElement(nvnode, nvnode.flags === 'Svg').el;
    if (pvnode) {
        pvnode.el.parentNode.insertBefore(el, pvnode.el.nextElementSibling);
    }
    else if (container) {
        container.appendChild(el);
    }
}
function replaceElement(pvnode, nvnode) {
    console.log('replace', pvnode);
    addVnode(nvnode, pvnode);
    removeVnode(pvnode);
    return;
}
function patchText(nvnode) {
    nvnode.el.innerHTML = nvnode.children;
}
function patchChildren(nvnode, pvnode, container) {
    var _a = nvnode || {}, childrenFlags = _a.childrenFlags, children = _a.children, el = _a.el /* 父容器 */;
    var _b = pvnode || {}, pChildrenFlags = _b.childrenFlags, pChildren = _b.children;
    if (pChildrenFlags === 'NoChildren') {
        switch (childrenFlags) {
            case 'NoChildren':
                return;
            case 'SingleChildren':
                return patch(children, null, el);
            case 'MutilpleChildren':
                children.forEach(function (child) {
                    patch(child, null, el);
                });
                return;
            case 'Text':
                addElement(nvnode, null, container);
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
                return patch(children, pChildren);
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
                pChildren.forEach(function (child) {
                    removeVnode(child);
                });
                return addElement(null, children, el);
            case 'MutilpleChildren':
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
                console.log('replapChildrenFlagsce', pvnode);
                return addVnode(children, null, el);
            case 'MutilpleChildren':
                children.forEach(function (child) {
                    patch(child, null, el);
                });
                pChildren.forEach(function (child) {
                    removeVnode(child);
                });
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
        return replaceElement(pvnode, nvnode); // tag是每一个vnode的类型，当类型不同的情况下替换新旧节点
    }
    else {
        if (pvnode.flags === nvnode.flags) { // vnode.flags代表当前vnode类型
            nvnode.el = pvnode.el;
            createElement_1.getAttributes(nvnode, pvnode);
            console.log(pvnode.el);
            patchChildren(nvnode, pvnode, nvnode.el);
        }
        else {
            return replaceElement(pvnode, nvnode);
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
