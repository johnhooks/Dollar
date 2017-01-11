"use strict";
function lt(a, b) {
    return a < b;
}
exports.lt = lt;
function lte(a, b) {
    return a <= b;
}
exports.lte = lte;
function gt(a, b) {
    return a > b;
}
exports.gt = gt;
function gte(a, b) {
    return a >= b;
}
exports.gte = gte;
// Addition and Subtraction of integers should return integers
function add(a, b) {
    return a + b;
}
exports.add = add;
function subtract(a, b) {
    return a - b;
}
exports.subtract = subtract;
// Multiplication and Division will most likely return floats which
// will need to be rounded.
function multiply(a, b) {
    return Math.round(a * b);
}
exports.multiply = multiply;
function divide(a, b) {
    return Math.round(a / b);
}
exports.divide = divide;
