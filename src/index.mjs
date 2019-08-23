export function int(s, { radix, defaults, throws } = {}) {
  if (s == null) {
    return defaults
  }

  s = parseInt(s, radix)

  if (isNaN(s)) {
    if (throws) {
      throw throws
    } else {
      return defaults
    }
  } else {
    return s
  }
}

export function float(s, { defaults, throws } = {}) {
  if (s == null) {
    return defaults
  }

  s = parseFloat(s)

  if (isNaN(s)) {
    if (throws) {
      throw throws
    } else {
      return defaults
    }
  } else {
    return s
  }
}

export function number(s, { defaults, throws } = {}) {
  if (s == null) {
    return defaults
  }

  s = Number(s)

  if (isNaN(s)) {
    if (throws) {
      throw throws
    } else {
      return defaults
    }
  } else {
    return s
  }
}

export function bool(s, { empty = true, defaults, throws } = {}) {
  if (s == null) {
    return defaults
  }

  const truthy = ['1', 'true', 'yes']
  const falsy = ['0', 'false', 'no']

  if (empty === true) {
    truthy.push('')
  } else if (empty === false) {
    falsy.push('')
  }

  if (truthy.includes(s)) {
    return true
  } else if (falsy.includes(s)) {
    return false
  } else {
    if (throws) {
      throw throws
    } else {
      return defaults
    }
  }
}

export function string(v, { defaults } = {}) {
  return v == null ? defaults : String(v)
}

export function arrayOfInt(a, { radix, defaults, dedup, splitComma, throws } = {}) {
  return trimArray(toArray(a, splitComma).map(s => int(s, { radix, throws })), defaults, dedup)
}

export function arrayOfFloat(a, { defaults, dedup, splitComma, throws } = {}) {
  return trimArray(toArray(a, splitComma).map(s => float(s, { throws })), defaults, dedup)
}

export function arrayOfNumber(a, { defaults, dedup, splitComma, throws } = {}) {
  return trimArray(toArray(a, splitComma).map(s => number(s, { throws })), defaults, dedup)
}

export function arrayOfString(a, { defaults, dedup, splitComma } = {}) {
  return trimArray(toArray(a, splitComma).map(v => string(v)), defaults, dedup)
}

function toArray(a, splitComma = false) {
  if (a == null) {
    return []
  }

  if (a.constructor === String) {
    a = [a]
  }

  if (splitComma) {
    a = a.join(',').split(',')
  }

  return a
}

function trimArray(a, defaults, dedup = true) {
  a = a.filter((v, i) => v != null && (dedup ? a.indexOf(v) === i : true))
  return a.length ? a : defaults
}

export function createCastObject(source) {
  function getValue(key, isArray = false) {
    let src = source

    if (source.constructor === Function) {
      src = source()
    }

    if (src.constructor === URLSearchParams) {
      return isArray ? src.getAll(key) : src.get(key)
    } else {
      return src[key]
    }
  }

  return {
    source,

    int(key, { defaults, radix, throws } = {}) {
      return int(getValue(key), { defaults, radix, throws })
    },

    float(key, { defaults, throws } = {}) {
      return float(getValue(key), { defaults, throws })
    },

    number(key, { defaults, throws } = {}) {
      return number(getValue(key), { defaults, throws })
    },

    bool(key, { empty, defaults, throws } = {}) {
      return bool(getValue(key), { empty, defaults, throws })
    },

    string(key, { defaults } = {}) {
      return string(getValue(key), { defaults })
    },

    arrayOfInt(key, { radix, defaults, dedup, splitComma, throws } = {}) {
      return arrayOfInt(getValue(key, true), { radix, defaults, dedup, splitComma, throws })
    },

    arrayOfFloat(key, { defaults, dedup, splitComma, throws } = {}) {
      return arrayOfFloat(getValue(key, true), { defaults, dedup, splitComma, throws })
    },

    arrayOfNumber(key, { defaults, dedup, splitComma, throws } = {}) {
      return arrayOfNumber(getValue(key, true), { defaults, dedup, splitComma, throws })
    },

    arrayOfString(key, { defaults, dedup, splitComma, throws } = {}) {
      return arrayOfString(getValue(key, true), { defaults, dedup, splitComma, throws })
    }
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
  createCastObject
}
