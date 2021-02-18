export function int(
  str: string | null | undefined,
  {
    radix,
    defaults
  }: {
    radix?: number,
    defaults?: number
  } = {}
): number | undefined {
  if (str === null || str === undefined) {
    return defaults;
  }

  const n = parseInt(str, radix);
  return isNaN(n) ? defaults : n;
}

export function float(str: string | null | undefined, { defaults }: { defaults?: number } = {}): number | undefined {
  if (str === null || str === undefined) {
    return defaults;
  }

  const n = parseFloat(str);
  return isNaN(n) ? defaults : n;
}

// https://stackoverflow.com/questions/12227594/which-is-better-numberx-or-parsefloatx
export function number(str: string | null | undefined, { defaults }: { defaults?: number } = {}): number | undefined {
  if (str === null || str === undefined) {
    return defaults;
  }

  const n = Number(str);
  return isNaN(n) ? defaults : n;
}

export function bool(
  str: string | null | undefined,
  {
    empty = true,
    defaults
  }: {
    empty?: boolean,
    defaults?: boolean
  } = {}
): boolean | undefined {
  if (str === null || str === undefined) {
    return defaults;
  }

  const truthy = ['1', 'true', 'yes'];
  const falsy = ['0', 'false', 'no'];

  if (empty === true) {
    truthy.push('');
  } else if (empty === false) {
    falsy.push('');
  }

  if (truthy.includes(str)) {
    return true;
  } else if (falsy.includes(str)) {
    return false;
  } else {
    return defaults;
  }
}

export function string(str: string | null | undefined, { defaults }: { defaults?: string } = {}): string | undefined {
  return str === null || str === undefined ? defaults : String(str);
}

export function arrayOfInt(
  str: string | string[] | null | undefined,
  {
    radix,
    defaults,
    dedup,
    splitComma
  }: {
    radix?: number,
    defaults?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined {
  return trimArray(
    toArray(str, splitComma).map(s => int(s, { radix })),
    defaults,
    dedup
  );
}

export function arrayOfFloat(
  str: string | string[] | null | undefined,
  {
    defaults,
    dedup,
    splitComma
  }: {
    defaults?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined {
  return trimArray(toArray(str, splitComma).map(s => float(s)), defaults, dedup);
}

export function arrayOfNumber(
  str: string | string[] | null | undefined,
  {
    defaults,
    dedup,
    splitComma
  }: {
    defaults?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined {
  return trimArray(toArray(str, splitComma).map(s => number(s)), defaults, dedup);
}

export function arrayOfString(
  str: string | string[] | null | undefined,
  {
    defaults,
    dedup,
    splitComma
  }: {
    defaults?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): string[] | undefined {
  return trimArray(toArray(str, splitComma).map(s => string(s)), defaults, dedup);
}

function toArray(str: string | string[] | null | undefined, splitComma = false): string[] {
  if (str === null || str === undefined) {
    return [];
  }

  let a = str instanceof Array ? str : [str];

  if (splitComma) {
    a = a.join(',').split(',');
  }

  return a;
}

function trimArray<T>(arr: (T | undefined)[], defaults: T[] | undefined = undefined, dedup = true): T[] | undefined {
  const a = arr.filter((v, i): v is T => v !== null && v !== undefined && (dedup ? arr.indexOf(v) === i : true));
  return a.length ? a : defaults;
}

type Source = URLSearchParams |
  Record<string, string | string[]> |
  (() => URLSearchParams | Record<string, string | string[]>);

export class StringCaster {
  private source: Source

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

  int(
    key: string,
    {
      defaults,
      radix
    }: {
      radix?: number,
      defaults?: number
    } = {}
  ): number | undefined {
    return int(this.get(key), { defaults, radix });
  }

  float(key: string, { defaults }: { defaults?: number } = {}): number | undefined {
    return float(this.get(key), { defaults });
  }

  number(key: string, { defaults }: { defaults?: number } = {}): number | undefined {
    return number(this.get(key), { defaults });
  }

  bool(
    key: string,
    {
      empty = true,
      defaults
    }: {
      empty?: boolean,
      defaults?: boolean
    } = {}
  ): boolean | undefined {
    return bool(this.get(key), { empty, defaults });
  }

  string(key: string, { defaults }: { defaults?: string } = {}): string | undefined {
    return string(this.get(key), { defaults });
  }

  arrayOfInt(
    key: string,
    {
      radix,
      defaults,
      dedup,
      splitComma
    }: {
      radix?: number,
      defaults?: undefined,
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): number[] | undefined {
    return arrayOfInt(this.getAll(key), { radix, defaults, dedup, splitComma });
  }

  arrayOfFloat(
    key: string,
    {
      defaults,
      dedup,
      splitComma
    }: {
      defaults?: undefined,
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): number[] | undefined {
    return arrayOfFloat(this.getAll(key), { defaults, dedup, splitComma });
  }

  arrayOfNumber(
    key: string,
    {
      defaults,
      dedup,
      splitComma
    }: {
      defaults?: undefined,
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): number[] | undefined {
    return arrayOfNumber(this.getAll(key), { defaults, dedup, splitComma });
  }

  arrayOfString(
    key: string,
    {
      defaults,
      dedup,
      splitComma
    }: {
      defaults?: undefined,
      dedup?: boolean,
      splitComma?: boolean
    } = {}
  ): string[] | undefined {
    return arrayOfString(this.getAll(key), { defaults, dedup, splitComma });
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
