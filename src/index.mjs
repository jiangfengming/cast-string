export function int(s, radix, defaults, throwIfInvalid = false) {
  if (s == null) {
    return defaults
  }

  s = parseInt(s, radix)

  if (isNaN(s)) {
    if (throwIfInvalid) {
      throw new Error(`can' cast "${s}" to int`)
    } else {
      return defaults
    }
  } else {
    return s
  }
}

export function float(s, defaults, throwIfInvalid = false) {
  if (s == null) {
    return defaults
  }

  s = parseFloat(s)

  if (isNaN(s)) {
    if (throwIfInvalid) {
      throw new Error(`can' cast "${s}" to float`)
    } else {
      return defaults
    }
  } else {
    return s
  }
}

export function number(s, defaults, throwIfInvalid = false) {
  if (s == null) {
    return defaults
  }

  s = Number(s)

  if (isNaN(s)) {
    if (throwIfInvalid) {
      throw new Error(`can' cast "${s}" to number`)
    } else {
      return defaults
    }
  } else {
    return s
  }
}

export function bool(s, defaults, throwIfInvalid = false) {
  if (s == null) {
    return defaults
  }

  const truthy = ['1', 'true', 'yes', '']
  const falsy = ['0', 'false', 'no']

  if (truthy.includes(s)) {
    return true
  } else if (falsy.includes(s)) {
    return false
  } else {
    if (throwIfInvalid) {
      throw new Error(`can' cast "${s}" to boolean`)
    } else {
      return defaults
    }
  }
}

export function string(i, defaults) {
  return i == null ? defaults : String(i)
}

export function arrayOfInt(a, radix, defaults, throwIfInvalid) {
  return a.map(s => int(s, radix, defaults, throwIfInvalid))
}

export function arrayOfFloat(a, defaults, throwIfInvalid) {
  return a.map(s => float(s, defaults, throwIfInvalid))
}

export function arrayOfNumber(a, defaults, throwIfInvalid) {
  return a.map(s => number(s, defaults, throwIfInvalid))
}

export function arrayOfString(a, defaults) {
  return a.map(i => string(i, defaults))
}

export function createCastObject(source) {
  function getValue(key, isArray = false) {
    let src = source

    if (source.constructor === Function) {
      src = source()
    }

    if (src.constructor === URLSearchParams) {
      if (isArray) {
        const val = src.getAll(key)

        if (val.length === 1) {
          return val[0].split(',')
        } else {
          return val
        }
      } else {
        return src.get(key)
      }
    } else if (src.constructor === Object) {
      if (isArray) {
        const val = src[key]

        if (val == null) {
          return []
        } else if (val.constructor === Array) {
          return val
        } else if (val.constructor === String) {
          return val.split(',')
        } else {
          return []
        }
      } else {
        const val = src[key]

        if (val == null) {
          return null
        } else if (val.constructor === Array) {
          return val[0]
        } else if (val.constructor === String) {
          return val
        } else {
          return null
        }
      }
    }
  }

  return {
    source,

    int(key, radix, defaults, throwIfInvalid) {
      return int(getValue(key), radix, defaults, throwIfInvalid)
    },

    float(key, defaults, throwIfInvalid) {
      return float(getValue(key), defaults, throwIfInvalid)
    },

    number(key, defaults, throwIfInvalid) {
      return number(getValue(key), defaults, throwIfInvalid)
    },

    bool(key, defaults, throwIfInvalid) {
      return bool(getValue(key), defaults, throwIfInvalid)
    },

    string(key, defaults) {
      return string(getValue(key), defaults)
    },

    arrayOfInt(key, radix, defaults, throwIfInvalid) {
      return arrayOfInt(getValue(key, true), radix, defaults, throwIfInvalid)
    },

    arrayOfFloat(key, defaults, throwIfInvalid) {
      return arrayOfFloat(getValue(key, true), defaults, throwIfInvalid)
    },

    arrayOfNumber(key, defaults, throwIfInvalid) {
      return arrayOfNumber(getValue(key, true), defaults, throwIfInvalid)
    },

    arrayOfString(key, defaults, throwIfInvalid) {
      return arrayOfString(getValue(key, true), defaults, throwIfInvalid)
    }
  }
}

export default { int, float, number, bool, string, arrayOfInt, arrayOfFloat, arrayOfNumber, arrayOfString }
