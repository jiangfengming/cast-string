function _int(s, radix, defaults, throwIfInvalid) {
  if (throwIfInvalid === void 0) {
    throwIfInvalid = false;
  }

  if (s == null) {
    return defaults;
  }

  s = parseInt(s, radix);

  if (isNaN(s)) {
    if (throwIfInvalid) {
      throw new Error("can' cast \"" + s + "\" to int");
    } else {
      return defaults;
    }
  } else {
    return s;
  }
}

function _float(s, defaults, throwIfInvalid) {
  if (throwIfInvalid === void 0) {
    throwIfInvalid = false;
  }

  if (s == null) {
    return defaults;
  }

  s = parseFloat(s);

  if (isNaN(s)) {
    if (throwIfInvalid) {
      throw new Error("can' cast \"" + s + "\" to float");
    } else {
      return defaults;
    }
  } else {
    return s;
  }
}
function number(s, defaults, throwIfInvalid) {
  if (throwIfInvalid === void 0) {
    throwIfInvalid = false;
  }

  if (s == null) {
    return defaults;
  }

  s = Number(s);

  if (isNaN(s)) {
    if (throwIfInvalid) {
      throw new Error("can' cast \"" + s + "\" to number");
    } else {
      return defaults;
    }
  } else {
    return s;
  }
}
function bool(s, defaults, throwIfInvalid) {
  if (throwIfInvalid === void 0) {
    throwIfInvalid = false;
  }

  if (s == null) {
    return defaults;
  }

  var truthy = ['1', 'true', 'yes', ''];
  var falsy = ['0', 'false', 'no'];

  if (truthy.includes(s)) {
    return true;
  } else if (falsy.includes(s)) {
    return false;
  } else {
    if (throwIfInvalid) {
      throw new Error("can' cast \"" + s + "\" to boolean");
    } else {
      return defaults;
    }
  }
}
function string(i, defaults) {
  return i == null ? defaults : String(i);
}
function arrayOfInt(a, radix, defaults, throwIfInvalid) {
  return a.map(function (s) {
    return _int(s, radix, defaults, throwIfInvalid);
  });
}
function arrayOfFloat(a, defaults, throwIfInvalid) {
  return a.map(function (s) {
    return _float(s, defaults, throwIfInvalid);
  });
}
function arrayOfNumber(a, defaults, throwIfInvalid) {
  return a.map(function (s) {
    return number(s, defaults, throwIfInvalid);
  });
}
function arrayOfString(a, defaults) {
  return a.map(function (i) {
    return string(i, defaults);
  });
}
var index = {
  "int": _int,
  "float": _float,
  number: number,
  bool: bool,
  string: string,
  arrayOfInt: arrayOfInt,
  arrayOfFloat: arrayOfFloat,
  arrayOfNumber: arrayOfNumber,
  arrayOfString: arrayOfString
};

export default index;
export { arrayOfFloat, arrayOfInt, arrayOfNumber, arrayOfString, bool, _float as float, _int as int, number, string };
