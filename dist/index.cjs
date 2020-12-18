"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringCaster = exports.arrayOfString = exports.arrayOfNumber = exports.arrayOfFloat = exports.arrayOfInt = exports.string = exports.bool = exports.number = exports.float = exports.int = void 0;
function int(str, { radix, defaults } = {}) {
    if (str === null || str === undefined) {
        return defaults;
    }
    const n = parseInt(str, radix);
    return isNaN(n) ? defaults : n;
}
exports.int = int;
function float(str, { defaults } = {}) {
    if (str === null || str === undefined) {
        return defaults;
    }
    const n = parseFloat(str);
    return isNaN(n) ? defaults : n;
}
exports.float = float;
// https://stackoverflow.com/questions/12227594/which-is-better-numberx-or-parsefloatx
function number(str, { defaults } = {}) {
    if (str === null || str === undefined) {
        return defaults;
    }
    const n = Number(str);
    return isNaN(n) ? defaults : n;
}
exports.number = number;
function bool(str, { empty = true, defaults } = {}) {
    if (str === null || str === undefined) {
        return defaults;
    }
    const truthy = ['1', 'true', 'yes'];
    const falsy = ['0', 'false', 'no'];
    if (empty === true) {
        truthy.push('');
    }
    else if (empty === false) {
        falsy.push('');
    }
    if (truthy.includes(str)) {
        return true;
    }
    else if (falsy.includes(str)) {
        return false;
    }
    else {
        return defaults;
    }
}
exports.bool = bool;
function string(str, { defaults } = {}) {
    return str === null || str === undefined ? defaults : String(str);
}
exports.string = string;
function arrayOfInt(str, { radix, defaults, dedup, splitComma } = {}) {
    return trimArray(toArray(str, splitComma).map(s => int(s, { radix })), defaults, dedup);
}
exports.arrayOfInt = arrayOfInt;
function arrayOfFloat(str, { defaults, dedup, splitComma } = {}) {
    return trimArray(toArray(str, splitComma).map(s => float(s)), defaults, dedup);
}
exports.arrayOfFloat = arrayOfFloat;
function arrayOfNumber(str, { defaults, dedup, splitComma } = {}) {
    return trimArray(toArray(str, splitComma).map(s => number(s)), defaults, dedup);
}
exports.arrayOfNumber = arrayOfNumber;
function arrayOfString(str, { defaults, dedup, splitComma } = {}) {
    return trimArray(toArray(str, splitComma).map(s => string(s)), defaults, dedup);
}
exports.arrayOfString = arrayOfString;
function toArray(str, splitComma = false) {
    if (str === null || str === undefined) {
        return [];
    }
    let a = str instanceof Array ? str : [str];
    if (splitComma) {
        a = a.join(',').split(',');
    }
    return a;
}
function trimArray(arr, defaults = undefined, dedup = true) {
    const a = arr.filter((v, i) => v !== null && v !== undefined && (dedup ? arr.indexOf(v) === i : true));
    return a.length ? a : defaults;
}
class StringCaster {
    constructor(source) {
        this.source = source;
    }
    get(key) {
        const src = this.source instanceof Function ? this.source() : this.source;
        if (src instanceof URLSearchParams) {
            return src.get(key);
        }
        else {
            const val = src[key];
            return val instanceof Array ? val[0] : val;
        }
    }
    getAll(key) {
        const src = this.source instanceof Function ? this.source() : this.source;
        return src instanceof URLSearchParams ? src.getAll(key) : src[key];
    }
    int(key, { defaults, radix } = {}) {
        return int(this.get(key), { defaults, radix });
    }
    float(key, { defaults } = {}) {
        return float(this.get(key), { defaults });
    }
    number(key, { defaults } = {}) {
        return number(this.get(key), { defaults });
    }
    bool(key, { empty = true, defaults } = {}) {
        return bool(this.get(key), { empty, defaults });
    }
    string(key, { defaults } = {}) {
        return string(this.get(key), { defaults });
    }
    arrayOfInt(key, { radix, defaults, dedup, splitComma } = {}) {
        return arrayOfInt(this.getAll(key), { radix, defaults, dedup, splitComma });
    }
    arrayOfFloat(key, { defaults, dedup, splitComma } = {}) {
        return arrayOfFloat(this.getAll(key), { defaults, dedup, splitComma });
    }
    arrayOfNumber(key, { defaults, dedup, splitComma } = {}) {
        return arrayOfNumber(this.getAll(key), { defaults, dedup, splitComma });
    }
    arrayOfString(key, { defaults, dedup, splitComma } = {}) {
        return arrayOfString(this.getAll(key), { defaults, dedup, splitComma });
    }
}
exports.StringCaster = StringCaster;
exports.default = {
    int,
    float,
    number,
    bool,
    string,
    arrayOfInt,
    arrayOfFloat,
    arrayOfNumber,
    arrayOfString,
    StringCaster
};
