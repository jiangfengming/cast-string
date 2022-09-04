export function int(str: string | null | undefined, options: { radix?: number, default: number }): number
export function int(str: string | null | undefined, options?: { radix?: number, default?: number }): number | undefined
export function int(
  str: string | null | undefined,
  options: { radix?: number, default?: number } = {}
): number | undefined {
  if (str === null || str === undefined) {
    return options.default;
  }

  const n = parseInt(str, options.radix);
  return isNaN(n) ? options.default : n;
}

export function float(str: string | null | undefined, options: { default: number }): number
export function float(str: string | null | undefined, options?: { default?: number }): number | undefined
export function float(str: string | null | undefined, options: { default?: number } = {}): number | undefined {
  if (str === null || str === undefined) {
    return options.default;
  }

  const n = parseFloat(str);
  return isNaN(n) ? options.default : n;
}

// https://stackoverflow.com/questions/12227594/which-is-better-numberx-or-parsefloatx
export function number(str: string | null | undefined, options: { default: number }): number
export function number(str: string | null | undefined, options?: { default?: number }): number | undefined
export function number(str: string | null | undefined, options: { default?: number } = {}): number | undefined {
  if (str === null || str === undefined) {
    return options.default;
  }

  const n = Number(str);
  return isNaN(n) ? options.default : n;
}

export function bool(str: string | null | undefined, options: { empty?: boolean, default: boolean }): boolean

export function bool(
  str: string | null | undefined,
  options?: { empty?: boolean, default?: boolean }
): boolean | undefined

export function bool(
  str: string | null | undefined,
  options: { empty?: boolean, default?: boolean } = {}
): boolean | undefined {
  if (str === null || str === undefined) {
    return options.default;
  }

  const truthy = ['1', 'true', 'yes'];
  const falsy = ['0', 'false', 'no'];

  if (options.empty === false) {
    falsy.push('');
  } else {
    truthy.push('');
  }

  if (truthy.includes(str)) {
    return true;
  } else if (falsy.includes(str)) {
    return false;
  } else {
    return options.default;
  }
}

export function string(str: string | null | undefined, options: { default: string }): string
export function string(str: string | null | undefined, options?: { default?: string }): string | undefined
export function string(str: string | null | undefined, options: { default?: string } = {}): string | undefined {
  return str === null || str === undefined ? options.default : String(str);
}

export function arrayOfInt(
  str: string | string[] | null | undefined,
  options: {
    radix?: number,
    default: number[],
    dedup?: boolean,
    splitComma?: boolean
  }
): number[]

export function arrayOfInt(
  str: string | string[] | null | undefined,
  options?: {
    radix?: number,
    default?: number[],
    dedup?: boolean,
    splitComma?: boolean
  }
): number[] | undefined

export function arrayOfInt(
  str: string | string[] | null | undefined,
  options: {
    radix?: number,
    default?: number[],
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined {
  return trimArray(
    toArray(str, options.splitComma).map(s => int(s, { radix: options.radix })),
    options.default,
    options.dedup
  );
}

export function arrayOfFloat(
  str: string | string[] | null | undefined,
  options: {
    default: number[],
    dedup?: boolean,
    splitComma?: boolean
  }
): number[]

export function arrayOfFloat(
  str: string | string[] | null | undefined,
  options?: {
    default?: number[],
    dedup?: boolean,
    splitComma?: boolean
  }
): number[] | undefined

export function arrayOfFloat(
  str: string | string[] | null | undefined,
  options: {
    default?: number[],
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined {
  return trimArray(
    toArray(str, options.splitComma).map(s => float(s)),
    options.default,
    options.dedup
  );
}

export function arrayOfNumber(
  str: string | string[] | null | undefined,
  options: {
    default: number[],
    dedup?: boolean,
    splitComma?: boolean
  }
): number[]

export function arrayOfNumber(
  str: string | string[] | null | undefined,
  options?: {
    default?: number[],
    dedup?: boolean,
    splitComma?: boolean
  }
): number[] | undefined

export function arrayOfNumber(
  str: string | string[] | null | undefined,
  options: {
    default?: number[],
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined {
  return trimArray(
    toArray(str, options.splitComma).map(s => number(s)),
    options.default,
    options.dedup
  );
}

export function arrayOfString(
  str: string | string[] | null | undefined,
  options: {
    default: string[],
    dedup?: boolean,
    splitComma?: boolean
  }
): string[]

export function arrayOfString(
  str: string | string[] | null | undefined,
  options?: {
    default?: string[],
    dedup?: boolean,
    splitComma?: boolean
  }
): string[] | undefined

export function arrayOfString(
  str: string | string[] | null | undefined,
  options: {
    default?: string[],
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): string[] | undefined {
  return trimArray(
    toArray(str, options.splitComma).map(s => string(s)),
    options.default,
    options.dedup
  );
}

function toArray(
  str: string | string[] | null | undefined,
  splitComma = false
): string[] {
  if (str === null || str === undefined) {
    return [];
  }

  let a = str instanceof Array ? str : [str];

  if (splitComma) {
    a = a.join(',').split(',');
  }

  return a;
}

function trimArray<T>(
  arr: (T | undefined)[],
  def: T[] | undefined = undefined,
  dedup = true
): T[] | undefined {
  const a = arr.filter((v, i): v is T =>
    v !== null &&
    v !== undefined &&
    (dedup ? arr.indexOf(v) === i : true)
  );

  return a.length ? a : def;
}

type Source = URLSearchParams |
  Record<string, string | string[]> |
  (() => URLSearchParams | Record<string, string | string[]>);

export class StringCaster {
  source: Source;

  constructor(source: Source) {
    this.source = source;
  }

  private get(key: string): string | null | undefined {
    const src = this.source instanceof Function ? this.source() : this.source;

    if (src instanceof URLSearchParams) {
      return src.get(key);
    } else {
      const val = src[key];
      return val instanceof Array ? val[0] : val;
    }
  }

  private getAll(key: string): string[] | string | null | undefined {
    const src = this.source instanceof Function ? this.source() : this.source;
    return src instanceof URLSearchParams ? src.getAll(key) : src[key];
  }

  int(key: string, options: { radix?: number, default: number }): number
  int(key: string, options?: { radix?: number, default?: number }): number | undefined
  int(key: string, options: { radix?: number, default?: number } = {}): number | undefined {
    return int(this.get(key), options);
  }

  float(key: string, options: { default: number }): number
  float(key: string, options?: { default?: number }): number | undefined
  float(key: string, options: { default?: number } = {}): number | undefined {
    return float(this.get(key), options);
  }

  number(key: string, options: { default: number }): number
  number(key: string, options?: { default?: number }): number | undefined
  number(key: string, options: { default?: number } = {}): number | undefined {
    return number(this.get(key), options);
  }

  bool(key: string, options: { empty?: boolean, default: boolean }): boolean
  bool(key: string, options?: { empty?: boolean, default?: boolean }): boolean | undefined
  bool(key: string, options: { empty?: boolean, default?: boolean } = {}): boolean | undefined {
    return bool(this.get(key), options);
  }

  string(key: string, options: { default: string }): string
  string(key: string, options?: { default?: string }): string | undefined
  string(key: string, options: { default?: string } = {}): string | undefined {
    return string(this.get(key), options);
  }

  arrayOfInt(
    key: string,
    options: {
      radix?: number,
      default: number[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): number[]

  arrayOfInt(
    key: string,
    options?: {
      radix?: number,
      default?: number[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): number[] | undefined

  arrayOfInt(
    key: string,
    options: {
      radix?: number,
      default?: number[],
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): number[] | undefined {
    return arrayOfInt(this.getAll(key), options);
  }

  arrayOfFloat(
    key: string,
    options: {
      default: number[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): number[]

  arrayOfFloat(
    key: string,
    options?: {
      default?: number[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): number[] | undefined

  arrayOfFloat(
    key: string,
    options: {
      default?: number[],
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): number[] | undefined {
    return arrayOfFloat(this.getAll(key), options);
  }

  arrayOfNumber(
    key: string,
    options: {
      default: number[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): number[]

  arrayOfNumber(key: string,
    options?: {
      default?: number[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): number[] | undefined

  arrayOfNumber(
    key: string,
    options: {
      default?: number[],
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): number[] | undefined {
    return arrayOfNumber(this.getAll(key), options);
  }

  arrayOfString(
    key: string,
    options: {
      default: string[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): string[]

  arrayOfString(
    key: string,
    options?: {
      default?: string[],
      dedup?: boolean,
      splitComma?: boolean
    }
  ): string[] | undefined

  arrayOfString(
    key: string,
    options: {
      default?: string[],
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): string[] | undefined {
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
