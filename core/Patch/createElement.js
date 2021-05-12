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
exports.createElement = exports.getAttributes = exports.mountChildren = void 0;
var utils_1 = require("../../utils");
var mount_1 = require("./mount");
var needCurrentAttribute = /value|checked|selected|muted/;
function processDomProperties(rest, el, handlerRest) {
    for (var key in rest) {
        if (key === 'on') {
            if (Object.prototype.toString.call(rest[key]) !== '[object Object]')
                continue;
            var eventHandler = rest[key];
            for (var event_1 in eventHandler) {
                el[handlerRest ? 'removeEventListener' : 'addEventListener'](event_1, eventHandler[event_1]);
            }
        }
        if (handlerRest === void 0 || !handlerRest.hasOwnProperty(key)) {
            if (needCurrentAttribute.test(key)) {
                el[key] = handlerRest ? void 0 : rest[key];
            }
            else {
                handlerRest ?
                    el.removeAttribute(key)
                    :
                        el.setAttribute(key, rest[key]);
            }
        }
    }
}
function mountChildren(children, el, childrenFlags, isSvg) {
    switch (childrenFlags) {
        case 'MutilpleChildren':
            for (var c = 0, len = children.length; c < len; c++) {
                mount_1["default"](children[c], el, isSvg);
            }
            break;
        case 'SingleChildren':
            mount_1["default"](children, el, isSvg);
            break;
        case 'Text':
            mount_1["default"](children, el);
            break;
        default:
            break;
    }
}
exports.mountChildren = mountChildren;
function getAttributes(vnode, pvnode) {
    var el = vnode.el;
    var _a = vnode.data || {}, _b = _a.styles, styles = _b === void 0 ? {} : _b, staticClass = _a.staticClass, rest = __rest(_a, ["styles", "staticClass"]);
    var _c = (pvnode || {}).data || {}, pStyles = _c.styles, pStaticClass = _c.staticClass, pRest = __rest(_c, ["styles", "staticClass"]);
    for (var key in styles) {
        el.style[utils_1.getHumpTransformReverse(key)] = typeof styles[key] === 'number' ? styles[key] + 'px' : styles[key];
    }
    for (var key in pStyles) {
        if (!styles.hasOwnProperty(key)) {
            el.style[utils_1.getHumpTransformReverse(key)] = void 0;
        }
    }
    if (staticClass) {
        el.className = staticClass;
    }
    processDomProperties(rest, el);
    processDomProperties(pRest, el, rest);
}
exports.getAttributes = getAttributes;
function createElement(vnode, isSvg) {
    var tag = vnode.tag, data = vnode.data;
    var el = isSvg ?
        document.createElementNS((data || {}).href || 'http://www.w3.org/1999/xhtml', tag)
        :
            document.createElement(tag);
    vnode.el = el;
    getAttributes(vnode, null);
    return vnode;
}
exports.createElement = createElement;
