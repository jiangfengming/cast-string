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

export default { int, float, number, bool, string, arrayOfInt, arrayOfFloat, arrayOfNumber, arrayOfString }
