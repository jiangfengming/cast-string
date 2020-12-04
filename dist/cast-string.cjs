'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _int(s) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _float(s) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _number(s) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _bool(s) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _string(v) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      defaults = _ref5.defaults;

  return v == null ? defaults : String(v);
}

function _arrayOfInt(a) {
  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _arrayOfFloat(a) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _arrayOfNumber(a) {
  var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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

function _arrayOfString(a) {
  var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      defaults = _ref9.defaults,
      dedup = _ref9.dedup,
      splitComma = _ref9.splitComma;

  return trimArray(toArray(a, splitComma).map(function (v) {
    return _string(v);
  }), defaults, dedup);
}

function toArray(a) {
  var splitComma = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

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

function trimArray(a, defaults) {
  var dedup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  a = a.filter(function (v, i) {
    return v != null && (dedup ? a.indexOf(v) === i : true);
  });
  return a.length ? a : defaults;
}

var StringCaster = /*#__PURE__*/function () {
  function StringCaster(source) {
    _classCallCheck(this, StringCaster);

    this.source = source;
  }

  _createClass(StringCaster, [{
    key: "_getValue",
    value: function _getValue(key) {
      var isArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var src = this.source;

      if (this.source instanceof Function) {
        src = this.source();
      }

      if (src instanceof URLSearchParams) {
        return isArray ? src.getAll(key) : src.get(key);
      } else {
        return src[key];
      }
    }
  }, {
    key: "int",
    value: function int(key) {
      var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          defaults = _ref10.defaults,
          radix = _ref10.radix,
          _throws8 = _ref10["throws"];

      return _int(this._getValue(key), {
        defaults: defaults,
        radix: radix,
        "throws": _throws8
      });
    }
  }, {
    key: "float",
    value: function float(key) {
      var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          defaults = _ref11.defaults,
          _throws9 = _ref11["throws"];

      return _float(this._getValue(key), {
        defaults: defaults,
        "throws": _throws9
      });
    }
  }, {
    key: "number",
    value: function number(key) {
      var _ref12 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          defaults = _ref12.defaults,
          _throws10 = _ref12["throws"];

      return _number(this._getValue(key), {
        defaults: defaults,
        "throws": _throws10
      });
    }
  }, {
    key: "bool",
    value: function bool(key) {
      var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          empty = _ref13.empty,
          defaults = _ref13.defaults,
          _throws11 = _ref13["throws"];

      return _bool(this._getValue(key), {
        empty: empty,
        defaults: defaults,
        "throws": _throws11
      });
    }
  }, {
    key: "string",
    value: function string(key) {
      var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          defaults = _ref14.defaults;

      return _string(this._getValue(key), {
        defaults: defaults
      });
    }
  }, {
    key: "arrayOfInt",
    value: function arrayOfInt(key) {
      var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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
    }
  }, {
    key: "arrayOfFloat",
    value: function arrayOfFloat(key) {
      var _ref16 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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
    }
  }, {
    key: "arrayOfNumber",
    value: function arrayOfNumber(key) {
      var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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
    }
  }, {
    key: "arrayOfString",
    value: function arrayOfString(key) {
      var _ref18 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
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
    }
  }]);

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
