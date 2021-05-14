"use strict";
exports.__esModule = true;
exports.mountFunctionalComponent = exports.mountStatusComponent = void 0;
var Observer_1 = require("../Reactive/Observer");
var render_1 = require("../Render/render");
var patch_1 = require("./patch");
var Watcher_1 = require("../Reactive/Watcher");
function mountStatusComponent(vnode) {
    var instance = vnode.instance = new vnode.tag();
    var $data = instance.$data = instance.data(instance);
    instance.$props = vnode.data.props || {};
    new Observer_1["default"]($data, instance);
    // new Observer(instance.$props, instance)
    instance._update = function () {
        var instanceVnode = instance.render.call(instance, render_1["default"]);
        if (instance.isMounted) {
            patch_1["default"](instanceVnode, instance.$vnode);
            instance.updated && instance.updated.call(instance);
        }
        else {
            instance.mounted && instance.mounted.call(instance);
            instance.isMounted = true;
        }
        instance.$vnode = instanceVnode;
        instance.$el = vnode.el = instanceVnode.el;
        return instanceVnode;
    };
    return new Watcher_1["default"](instance._update, instance);
}
exports.mountStatusComponent = mountStatusComponent;
function mountFunctionalComponent(vnode) {
    var $vnode = vnode.tag();
    vnode.el = $vnode.el;
    return $vnode;
}
exports.mountFunctionalComponent = mountFunctionalComponent;
