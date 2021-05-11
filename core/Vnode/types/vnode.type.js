"use strict";
exports.__esModule = true;
exports.ChildrenFlags = exports.VnodeFlags = void 0;
var VnodeFlags;
(function (VnodeFlags) {
    VnodeFlags[VnodeFlags["Normal"] = 0] = "Normal";
    VnodeFlags[VnodeFlags["Svg"] = 1] = "Svg";
    VnodeFlags[VnodeFlags["StatusComponent"] = 2] = "StatusComponent";
    VnodeFlags[VnodeFlags["FunctionalComponent"] = 3] = "FunctionalComponent";
    VnodeFlags[VnodeFlags["Text"] = 4] = "Text";
    VnodeFlags[VnodeFlags["Fragment"] = 5] = "Fragment";
    VnodeFlags[VnodeFlags["Portal"] = 6] = "Portal"; // 指定挂载容器的节点
})(VnodeFlags = exports.VnodeFlags || (exports.VnodeFlags = {}));
var ChildrenFlags;
(function (ChildrenFlags) {
    ChildrenFlags[ChildrenFlags["NoChildren"] = 0] = "NoChildren";
    ChildrenFlags[ChildrenFlags["MutilpleChildren"] = 1] = "MutilpleChildren";
    ChildrenFlags[ChildrenFlags["SingleChildren"] = 2] = "SingleChildren";
    ChildrenFlags[ChildrenFlags["Text"] = 3] = "Text";
})(ChildrenFlags = exports.ChildrenFlags || (exports.ChildrenFlags = {}));
