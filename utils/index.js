"use strict";
exports.__esModule = true;
exports.removeDupSpaces = exports.getHumpTransformReverse = exports.getHumpTransform = void 0;
function getHumpTransform(string) {
    return string.replace(/-(.*)/g, function (c) {
        return c.toUpperCase();
    });
}
exports.getHumpTransform = getHumpTransform;
function getHumpTransformReverse(string) {
    return string.replace(/[A-Z]/g, function (c) {
        return '-' + c.toLowerCase();
    });
}
exports.getHumpTransformReverse = getHumpTransformReverse;
function removeDupSpaces(string) {
    return string.replace(/\s+/g, ' ');
}
exports.removeDupSpaces = removeDupSpaces;
