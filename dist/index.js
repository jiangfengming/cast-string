export function int(str, options = {}) {
    if (str === null || str === undefined) {
        return options.default;
    }
    const n = parseInt(str, options.radix);
    return isNaN(n) ? options.default : n;
}
export function float(str, options = {}) {
    if (str === null || str === undefined) {
        return options.default;
    }
    const n = parseFloat(str);
    return isNaN(n) ? options.default : n;
}
// https://stackoverflow.com/questions/12227594/which-is-better-numberx-or-parsefloatx
export function number(str, options = {}) {
    if (str === null || str === undefined) {
        return options.default;
    }
    const n = Number(str);
    return isNaN(n) ? options.default : n;
}
export function bool(str, options = {}) {
    if (str === null || str === undefined) {
        return options.default;
    }
    const truthy = ['1', 'true', 'yes'];
    const falsy = ['0', 'false', 'no'];
    if (options.empty === false) {
        falsy.push('');
    }
    else {
        truthy.push('');
    }
    if (truthy.includes(str)) {
        return true;
    }
    else if (falsy.includes(str)) {
        return false;
    }
    else {
        return options.default;
    }
}
export function string(str, options = {}) {
    return str === null || str === undefined ? options.default : String(str);
}
export function arrayOfInt(str, options = {}) {
    return trimArray(toArray(str, options.splitComma).map(s => int(s, { radix: options.radix })), options.default, options.dedup);
}
export function arrayOfFloat(str, options = {}) {
    return trimArray(toArray(str, options.splitComma).map(s => float(s)), options.default, options.dedup);
}
export function arrayOfNumber(str, options = {}) {
    return trimArray(toArray(str, options.splitComma).map(s => number(s)), options.default, options.dedup);
}
export function arrayOfString(str, options = {}) {
    return trimArray(toArray(str, options.splitComma).map(s => string(s)), options.default, options.dedup);
}
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
function trimArray(arr, def = undefined, dedup = true) {
    const a = arr.filter((v, i) => v !== null &&
        v !== undefined &&
        (dedup ? arr.indexOf(v) === i : true));
    return a.length ? a : def;
}
export class StringCaster {
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
    int(key, options) {
        return int(this.get(key), options);
    }
    float(key, options) {
        return float(this.get(key), options);
    }
    number(key, options) {
        return number(this.get(key), options);
    }
    bool(key, options) {
        return bool(this.get(key), options);
    }
    string(key, options) {
        return string(this.get(key), options);
    }
    arrayOfInt(key, options) {
        return arrayOfInt(this.getAll(key), options);
    }
    arrayOfFloat(key, options) {
        return arrayOfFloat(this.getAll(key), options);
    }
    arrayOfNumber(key, options) {
        return arrayOfNumber(this.getAll(key), options);
    }
    arrayOfString(key, options) {
        return arrayOfString(this.getAll(key), options);
    }
}
export default {
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
