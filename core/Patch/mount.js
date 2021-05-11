"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var render_1 = require("../Render/render");
var utils_1 = require("../../utils");
var needCurrentAttribute = /value|checked|selected|muted/;
function getAttributes(el, data) {
    var _a = data || {}, _b = _a.styles, styles = _b === void 0 ? {} : _b, staticClass = _a.staticClass, rest = __rest(_a, ["styles", "staticClass"]);
    for (var key in styles) {
        el.style[utils_1.getHumpTransformReverse(key)] = typeof styles[key] === 'number' ? styles[key] + 'px' : styles[key];
    }
    if (staticClass) {
        el.className = staticClass;
    }
    for (var key in rest) {
        if (key === 'on') {
            if (Object.prototype.toString.call(rest[key]) !== '[object Object]')
                continue;
            var eventHandler = rest[key];
            for (var event_1 in eventHandler) {
                el.addEventListener(event_1, eventHandler[event_1]);
            }
        }
        else if (needCurrentAttribute.test(key)) {
            el[key] = rest[key];
        }
        else {
            el.setAttribute(key, rest[key]);
        }
    }
}
function mountText(children, container) {
    var el = document.createTextNode(children);
    container.appendChild(el);
}
function mountChildren(children, el, childrenFlags, isSvg) {
    switch (childrenFlags) {
        case 'MutilpleChildren':
            for (var c = 0, len = children.length; c < len; c++) {
                mount(children[c], el, isSvg);
            }
            break;
        case 'SingleChildren':
            mount(children, el, isSvg);
            break;
        case 'Text':
            mount(children, el);
            break;
        default:
            break;
    }
}
function mountElement(vnode, container, isSvg) {
    var tag = vnode.tag, children = vnode.children, childrenFlags = vnode.childrenFlags, data = vnode.data;
    var el = isSvg ?
        document.createElementNS((data || {}).href || 'http://www.w3.org/1999/xhtml', tag)
        :
            document.createElement(tag);
    vnode.el = el;
    getAttributes(el, vnode.data);
    mountChildren(children, el, childrenFlags, isSvg);
    container.appendChild(el);
}
function mountFragment(vnode, container) {
    var children = vnode.children, childrenFlags = vnode.childrenFlags;
    var fragment = document.createDocumentFragment();
    mountChildren(children, fragment, childrenFlags);
    switch (childrenFlags) {
        case 'MutilpleChildren':
            vnode.el = children[0].el;
            break;
        case 'SingleChildren':
            vnode.el = children.el;
            break;
        case 'Text':
            vnode.el = children.el;
            break;
        default:
            break;
    }
    container.appendChild(fragment);
}
function mountPortal(vnode) {
    var children = vnode.children, childrenFlags = vnode.childrenFlags, target = vnode.data.target;
    vnode.el = null;
    mountChildren(children, document.querySelector(target), childrenFlags);
}
function mountStatusComponent(vnode, container) {
    var instance = new vnode.tag();
    var instanceVnode = instance.render(render_1["default"]);
    mount(instanceVnode, container);
    instance.$el = vnode.el = instanceVnode.el;
}
function mountFunctionalComponent(vnode, container, isSvg) {
    var $vnode = vnode.tag();
    mount($vnode, container, isSvg);
    vnode.el = $vnode.el;
    console.log(vnode);
}
function mount(vnode, container, isSvg) {
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
        mountText(vnode, container);
    }
}
exports["default"] = mount;
