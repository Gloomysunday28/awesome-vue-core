"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var render_1 = require("../Render/render");
var Patch_1 = require("../Patch");
var component_1 = require("../Component/component");
function AweSomeVue(option) {
    if (!this || this.constructor !== AweSomeVue)
        throw new Error('[AweSomeVue]: Please new Function~');
    this.init(option);
}
AweSomeVue.extend = function (option) {
    var SuperVue = /** @class */ (function (_super) {
        __extends(SuperVue, _super);
        function SuperVue() {
            var _this = _super.call(this) || this;
            Object.assign(_this, option);
            return _this;
        }
        return SuperVue;
    }(component_1["default"]));
    return SuperVue;
};
AweSomeVue.prototype.init = function (option) {
    var vnode = option.render(render_1["default"]);
    this.renderAweSomeVue(vnode, option.el, this);
    this.$vnode = vnode;
    this.$el = vnode.el;
    this.$option = option;
    if (!this.isMounted) {
        option.mounted && option.mounted(this);
        this.isMounted = true;
    }
    return vnode;
};
AweSomeVue.prototype.renderAweSomeVue = Patch_1["default"];
exports["default"] = AweSomeVue;
