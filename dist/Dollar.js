"use strict";
var util_1 = require("./util");
var Dollar = (function () {
    function Dollar(amount, processed) {
        if (processed === void 0) { processed = false; }
        this.value = (processed && typeof amount === 'number') ? amount : process(amount);
    }
    Dollar.prototype.add = function (amount) {
        var value = this.perform(util_1.add, amount);
        return new Dollar(value, true);
    };
    Dollar.prototype.subtract = function (amount) {
        var value = this.perform(util_1.subtract, amount);
        return new Dollar(value, true);
    };
    // Multiplication and Division will most likely return floats which
    // will need to be rounded.
    Dollar.prototype.multiply = function (amount) {
        // amount is always a number
        var value = Math.round(this.value * amount);
        return new Dollar(value, true);
    };
    Dollar.prototype.divide = function (amount) {
        // amount is always a number
        var value = Math.round(this.value * amount);
        return new Dollar(value, true);
    };
    Dollar.prototype.gt = function (amount) {
        return this.compare(util_1.gt, amount);
    };
    Dollar.prototype.gte = function (amount) {
        return this.compare(util_1.gte, amount);
    };
    Dollar.prototype.lt = function (amount) {
        return this.compare(util_1.lt, amount);
    };
    Dollar.prototype.lte = function (amount) {
        return this.compare(util_1.lte, amount);
    };
    Dollar.prototype.toString = function () {
        var sign = '';
        var output = (this.value / 100).toFixed(2);
        var ch = output.charAt(0);
        if (ch === '-' || ch === '+') {
            sign = ch;
            output = output.substring(1);
        }
        output = output.replace(/./g, function (c, i, a) {
            return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
        return sign + output;
    };
    Dollar.prototype.perform = function (func, amount) {
        var processed = (amount instanceof Dollar)
            ? amount.value
            : process(amount);
        var value = func(this.value, processed);
        return value;
    };
    Dollar.prototype.compare = function (func, amount) {
        var processed = (amount instanceof Dollar)
            ? amount.value
            : process(amount);
        var value = func(this.value, processed);
        return value;
    };
    return Dollar;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dollar;
function process(amount) {
    // Allow dashed or comma string input for convience.
    // Example: '300_000_000.00' or '300,000,000.00'
    if (typeof amount === 'string') {
        if (!(/^[-\s0-9_,.]*$/).test(amount)) {
            throw new Error('Invalid Dollar input amount');
        }
        amount = parseFloat(amount.replace(/[_,]/g, ''));
        if (isNaN(amount)) {
            throw new Error('Invalid Dollar input amount');
        }
    }
    var negative = amount < 0;
    amount = Math.abs(amount) * 100;
    amount = negative ? -amount : amount;
    // Round down if thousands is under 5, otherwise round up
    // Math.round rounds a -0.5 to -0 and -0.6 to -1
    amount = Math.round(amount);
    return amount;
}
