export declare function int(str: string | null | undefined, { radix, defaults }?: {
    radix?: number;
    defaults?: number;
}): number | undefined;
export declare function float(str: string | null | undefined, { defaults }?: {
    defaults?: number;
}): number | undefined;
export declare function number(str: string | null | undefined, { defaults }?: {
    defaults?: number;
}): number | undefined;
export declare function bool(str: string | null | undefined, { empty, defaults }?: {
    empty?: boolean;
    defaults?: boolean;
}): boolean | undefined;
export declare function string(str: string | null | undefined, { defaults }?: {
    defaults?: string;
}): string | undefined;
export declare function arrayOfInt(str: string | string[] | null | undefined, { radix, defaults, dedup, splitComma }?: {
    radix?: number;
    defaults?: undefined;
    dedup?: boolean;
    splitComma?: boolean;
}): number[] | undefined;
export declare function arrayOfFloat(str: string | string[] | null | undefined, { defaults, dedup, splitComma }?: {
    defaults?: undefined;
    dedup?: boolean;
    splitComma?: boolean;
}): number[] | undefined;
export declare function arrayOfNumber(str: string | string[] | null | undefined, { defaults, dedup, splitComma }?: {
    defaults?: undefined;
    dedup?: boolean;
    splitComma?: boolean;
}): number[] | undefined;
export declare function arrayOfString(str: string | string[] | null | undefined, { defaults, dedup, splitComma }?: {
    defaults?: undefined;
    dedup?: boolean;
    splitComma?: boolean;
}): string[] | undefined;
declare type Source = URLSearchParams | Record<string, string | string[]> | (() => URLSearchParams | Record<string, string>);
export declare class StringCaster {
    private source;
    constructor(source: Source);
    private get;
    private getAll;
    int(key: string, { defaults, radix }?: {
        radix?: number;
        defaults?: number;
    }): number | undefined;
    float(key: string, { defaults }?: {
        defaults?: number;
    }): number | undefined;
    number(key: string, { defaults }?: {
        defaults?: number;
    }): number | undefined;
    bool(key: string, { empty, defaults }?: {
        empty?: boolean;
        defaults?: boolean;
    }): boolean | undefined;
    string(key: string, { defaults }?: {
        defaults?: string;
    }): string | undefined;
    arrayOfInt(key: string, { radix, defaults, dedup, splitComma }?: {
        radix?: number;
        defaults?: undefined;
        dedup?: boolean;
        splitComma?: boolean;
    }): number[] | undefined;
    arrayOfFloat(key: string, { defaults, dedup, splitComma }?: {
        defaults?: undefined;
        dedup?: boolean;
        splitComma?: boolean;
    }): number[] | undefined;
    arrayOfNumber(key: string, { defaults, dedup, splitComma }?: {
        defaults?: undefined;
        dedup?: boolean;
        splitComma?: boolean;
    }): number[] | undefined;
    arrayOfString(key: string, { defaults, dedup, splitComma }?: {
        defaults?: undefined;
        dedup?: boolean;
        splitComma?: boolean;
    }): string[] | undefined;
}
declare const _default: {
    int: typeof int;
    float: typeof float;
    number: typeof number;
    bool: typeof bool;
    string: typeof string;
    arrayOfInt: typeof arrayOfInt;
    arrayOfFloat: typeof arrayOfFloat;
    arrayOfNumber: typeof arrayOfNumber;
    arrayOfString: typeof arrayOfString;
    StringCaster: typeof StringCaster;
};
export default _default;
