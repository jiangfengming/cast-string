'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _int(s, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      radix = _ref.radix,
      defaults = _ref.defaults,
      _throws = _ref["throws"];

  if (s == null) {
    return defaults;
  }

  s = parseInt(s, radix);

  if (isNaN(s)) {
    if (_throws) {
      throw _throws;
    } else {
      return defaults;
    }
  } else {
    return s;
  }
}

function _float(s, _temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      defaults = _ref2.defaults,
      _throws2 = _ref2["throws"];

  if (s == null) {
    return defaults;
  }

  s = parseFloat(s);

  if (isNaN(s)) {
    if (_throws2) {
      throw _throws2;
    } else {
      return defaults;
    }
  } else {
    return s;
  }
}

function _number(s, _temp3) {
  var _ref3 = _temp3 === void 0 ? {} : _temp3,
      defaults = _ref3.defaults,
      _throws3 = _ref3["throws"];

  if (s == null) {
    return defaults;
  }

  s = Number(s);

  if (isNaN(s)) {
    if (_throws3) {
      throw _throws3;
    } else {
      return defaults;
    }
  } else {
    return s;
  }
}

function _bool(s, _temp4) {
  var _ref4 = _temp4 === void 0 ? {} : _temp4,
      _ref4$empty = _ref4.empty,
      empty = _ref4$empty === void 0 ? true : _ref4$empty,
      defaults = _ref4.defaults,
      _throws4 = _ref4["throws"];

  if (s == null) {
    return defaults;
  }

  var truthy = ['1', 'true', 'yes'];
  var falsy = ['0', 'false', 'no'];

  if (empty === true) {
    truthy.push('');
  } else if (empty === false) {
    falsy.push('');
  }

  if (truthy.includes(s)) {
    return true;
  } else if (falsy.includes(s)) {
    return false;
  } else {
    if (_throws4) {
      throw _throws4;
    } else {
      return defaults;
    }
  }
}

function _string(v, _temp5) {
  var _ref5 = _temp5 === void 0 ? {} : _temp5,
      defaults = _ref5.defaults;

  return v == null ? defaults : String(v);
}

function _arrayOfInt(a, _temp6) {
  var _ref6 = _temp6 === void 0 ? {} : _temp6,
      radix = _ref6.radix,
      defaults = _ref6.defaults,
      dedup = _ref6.dedup,
      splitComma = _ref6.splitComma,
      _throws5 = _ref6["throws"];

  return trimArray(toArray(a, splitComma).map(function (s) {
    return _int(s, {
      radix: radix,
      "throws": _throws5
    });
  }), defaults, dedup);
}

function _arrayOfFloat(a, _temp7) {
  var _ref7 = _temp7 === void 0 ? {} : _temp7,
      defaults = _ref7.defaults,
      dedup = _ref7.dedup,
      splitComma = _ref7.splitComma,
      _throws6 = _ref7["throws"];

  return trimArray(toArray(a, splitComma).map(function (s) {
    return _float(s, {
      "throws": _throws6
    });
  }), defaults, dedup);
}

function _arrayOfNumber(a, _temp8) {
  var _ref8 = _temp8 === void 0 ? {} : _temp8,
      defaults = _ref8.defaults,
      dedup = _ref8.dedup,
      splitComma = _ref8.splitComma,
      _throws7 = _ref8["throws"];

  return trimArray(toArray(a, splitComma).map(function (s) {
    return _number(s, {
      "throws": _throws7
    });
  }), defaults, dedup);
}

function _arrayOfString(a, _temp9) {
  var _ref9 = _temp9 === void 0 ? {} : _temp9,
      defaults = _ref9.defaults,
      dedup = _ref9.dedup,
      splitComma = _ref9.splitComma;

  return trimArray(toArray(a, splitComma).map(function (v) {
    return _string(v);
  }), defaults, dedup);
}

function toArray(a, splitComma) {
  if (splitComma === void 0) {
    splitComma = false;
  }

  if (a == null) {
    return [];
  }

  if (a.constructor === String) {
    a = [a];
  }

  if (splitComma) {
    a = a.join(',').split(',');
  }

  return a;
}

function trimArray(a, defaults, dedup) {
  if (dedup === void 0) {
    dedup = true;
  }

  a = a.filter(function (v, i) {
    return v != null && (dedup ? a.indexOf(v) === i : true);
  });
  return a.length ? a : defaults;
}

var StringCaster =
/*#__PURE__*/
function () {
  function StringCaster(source) {
    this.source = source;
  }

  var _proto = StringCaster.prototype;

  _proto._getValue = function _getValue(key, isArray) {
    if (isArray === void 0) {
      isArray = false;
    }

    var src = this.source;

    if (this.source instanceof Function) {
      src = this.source();
    }

    if (src instanceof URLSearchParams) {
      return isArray ? src.getAll(key) : src.get(key);
    } else {
      return src[key];
    }
  };

  _proto["int"] = function int(key, _temp10) {
    var _ref10 = _temp10 === void 0 ? {} : _temp10,
        defaults = _ref10.defaults,
        radix = _ref10.radix,
        _throws8 = _ref10["throws"];

    return _int(this._getValue(key), {
      defaults: defaults,
      radix: radix,
      "throws": _throws8
    });
  };

  _proto["float"] = function float(key, _temp11) {
    var _ref11 = _temp11 === void 0 ? {} : _temp11,
        defaults = _ref11.defaults,
        _throws9 = _ref11["throws"];

    return _float(this._getValue(key), {
      defaults: defaults,
      "throws": _throws9
    });
  };

  _proto.number = function number(key, _temp12) {
    var _ref12 = _temp12 === void 0 ? {} : _temp12,
        defaults = _ref12.defaults,
        _throws10 = _ref12["throws"];

    return _number(this._getValue(key), {
      defaults: defaults,
      "throws": _throws10
    });
  };

  _proto.bool = function bool(key, _temp13) {
    var _ref13 = _temp13 === void 0 ? {} : _temp13,
        empty = _ref13.empty,
        defaults = _ref13.defaults,
        _throws11 = _ref13["throws"];

    return _bool(this._getValue(key), {
      empty: empty,
      defaults: defaults,
      "throws": _throws11
    });
  };

  _proto.string = function string(key, _temp14) {
    var _ref14 = _temp14 === void 0 ? {} : _temp14,
        defaults = _ref14.defaults;

    return _string(this._getValue(key), {
      defaults: defaults
    });
  };

  _proto.arrayOfInt = function arrayOfInt(key, _temp15) {
    var _ref15 = _temp15 === void 0 ? {} : _temp15,
        radix = _ref15.radix,
        defaults = _ref15.defaults,
        dedup = _ref15.dedup,
        splitComma = _ref15.splitComma,
        _throws12 = _ref15["throws"];

    return _arrayOfInt(this._getValue(key, true), {
      radix: radix,
      defaults: defaults,
      dedup: dedup,
      splitComma: splitComma,
      "throws": _throws12
    });
  };

  _proto.arrayOfFloat = function arrayOfFloat(key, _temp16) {
    var _ref16 = _temp16 === void 0 ? {} : _temp16,
        defaults = _ref16.defaults,
        dedup = _ref16.dedup,
        splitComma = _ref16.splitComma,
        _throws13 = _ref16["throws"];

    return _arrayOfFloat(this._getValue(key, true), {
      defaults: defaults,
      dedup: dedup,
      splitComma: splitComma,
      "throws": _throws13
    });
  };

  _proto.arrayOfNumber = function arrayOfNumber(key, _temp17) {
    var _ref17 = _temp17 === void 0 ? {} : _temp17,
        defaults = _ref17.defaults,
        dedup = _ref17.dedup,
        splitComma = _ref17.splitComma,
        _throws14 = _ref17["throws"];

    return _arrayOfNumber(this._getValue(key, true), {
      defaults: defaults,
      dedup: dedup,
      splitComma: splitComma,
      "throws": _throws14
    });
  };

  _proto.arrayOfString = function arrayOfString(key, _temp18) {
    var _ref18 = _temp18 === void 0 ? {} : _temp18,
        defaults = _ref18.defaults,
        dedup = _ref18.dedup,
        splitComma = _ref18.splitComma,
        _throws15 = _ref18["throws"];

    return _arrayOfString(this._getValue(key, true), {
      defaults: defaults,
      dedup: dedup,
      splitComma: splitComma,
      "throws": _throws15
    });
  };

  return StringCaster;
}();
var index = {
  "int": _int,
  "float": _float,
  number: _number,
  bool: _bool,
  string: _string,
  arrayOfInt: _arrayOfInt,
  arrayOfFloat: _arrayOfFloat,
  arrayOfNumber: _arrayOfNumber,
  arrayOfString: _arrayOfString,
  StringCaster: StringCaster
};

exports.StringCaster = StringCaster;
exports.arrayOfFloat = _arrayOfFloat;
exports.arrayOfInt = _arrayOfInt;
exports.arrayOfNumber = _arrayOfNumber;
exports.arrayOfString = _arrayOfString;
exports.bool = _bool;
exports.default = index;
exports.float = _float;
exports.int = _int;
exports.number = _number;
exports.string = _string;
