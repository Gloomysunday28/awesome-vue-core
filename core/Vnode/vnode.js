"use strict";
exports.__esModule = true;
exports.Vnode = void 0;
var utils_1 = require("../../utils");
var AweSomeVue_1 = require("../AweSomeVue");
var render_1 = require("../Render/render");
function getFlags(tag, data) {
    if (typeof tag === 'string') {
        if (tag !== 'svg') {
            return 'Normal';
        }
        else {
            return 'Svg';
        }
    }
    else if (typeof tag === 'function') {
        if (tag.prototype && tag.prototype.render) {
            return 'StatusComponent';
        }
        else {
            return 'FunctionalComponent';
        }
    }
    else if (typeof tag === 'symbol') {
        if (data && data.target) {
            return 'Portal';
        }
        else {
            return 'Fragment';
        }
    }
    else {
        return 'Text';
    }
}
function getChildrenFlags(children) {
    if (Array.isArray(children)) {
        return 'MutilpleChildren';
    }
    else if (Object.prototype.toString.call(children) === '[object Object]') {
        return 'SingleChildren';
    }
    else if (typeof children === 'string') {
        return 'Text';
    }
    else {
        return 'NoChildren';
    }
}
function getTransfromClass(staticClass) {
    if (staticClass === null)
        return null;
    var type = typeof staticClass;
    if (type === 'string')
        return staticClass;
    else if (type === 'object') {
        if (Array.isArray(staticClass)) {
            return staticClass.reduce(function (prev, next) {
                return prev += " " + getTransfromClass(next);
            }, '');
        }
        else if (Object.prototype.toString.call(staticClass) === '[object Object]') {
            return Object.keys(staticClass).reduce(function (prev, next) {
                return prev + (staticClass[next] ? " " + next : '');
            }, '');
        }
        else {
            return null;
        }
    }
    return staticClass || '';
}
function getTransfromData(data) {
    var staticClass = (data || {}).staticClass;
    (data || {}).staticClass = utils_1.removeDupSpaces(getTransfromClass(staticClass));
    return data;
}
function createFunctionalComponent(option) {
    return function () {
        return option.render(render_1["default"]);
    };
}
var Vnode = /** @class */ (function () {
    function Vnode(tag, data, children) {
        this.tag = null;
        this.data = null;
        this.children = null;
        this.slots = null;
        this.flags = null;
        this.childrenFlags = null;
        this.tag = typeof tag === 'object' ? (tag.functional ? createFunctionalComponent(tag) : AweSomeVue_1["default"].extend(tag)) : tag;
        this.data = getTransfromData(data);
        this.children = children;
        this.flags = getFlags(this.tag, data);
        this.childrenFlags = getChildrenFlags(children);
    }
    return Vnode;
}());
exports.Vnode = Vnode;
