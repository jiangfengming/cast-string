/// <reference types="node" />
export declare function int(str: string | null | undefined, options: {
    radix?: number;
    default: number;
}): number;
export declare function int(str: string | null | undefined, options?: {
    radix?: number;
}): number | undefined;
export declare function float(str: string | null | undefined, options: {
    default: number;
}): number;
export declare function float(str: string | null | undefined, options?: Record<string, never>): number | undefined;
export declare function number(str: string | null | undefined, options: {
    default: number;
}): number;
export declare function number(str: string | null | undefined, options?: Record<string, never>): number | undefined;
export declare function bool(str: string | null | undefined, options: {
    empty?: boolean;
    default: boolean;
}): boolean;
export declare function bool(str: string | null | undefined, options?: {
    empty?: boolean;
}): boolean | undefined;
export declare function string(str: string | null | undefined, options: {
    default: string;
}): string;
export declare function string(str: string | null | undefined, options?: Record<string, never>): string | undefined;
export declare function arrayOfInt(str: string | string[] | null | undefined, options: {
    radix?: number;
    default: number[];
    dedup?: boolean;
    splitComma?: boolean;
}): number[];
export declare function arrayOfInt(str: string | string[] | null | undefined, options?: {
    radix?: number;
    dedup?: boolean;
    splitComma?: boolean;
}): number[] | undefined;
export declare function arrayOfFloat(str: string | string[] | null | undefined, options: {
    default: number[];
    dedup?: boolean;
    splitComma?: boolean;
}): number[];
export declare function arrayOfFloat(str: string | string[] | null | undefined, options?: {
    dedup?: boolean;
    splitComma?: boolean;
}): number[] | undefined;
export declare function arrayOfNumber(str: string | string[] | null | undefined, options: {
    default: number[];
    dedup?: boolean;
    splitComma?: boolean;
}): number[];
export declare function arrayOfNumber(str: string | string[] | null | undefined, options?: {
    dedup?: boolean;
    splitComma?: boolean;
}): number[] | undefined;
export declare function arrayOfString(str: string | string[] | null | undefined, options: {
    default: string[];
    dedup?: boolean;
    splitComma?: boolean;
}): string[];
export declare function arrayOfString(str: string | string[] | null | undefined, options?: {
    dedup?: boolean;
    splitComma?: boolean;
}): string[] | undefined;
declare type Source = URLSearchParams | Record<string, string | string[]> | (() => URLSearchParams | Record<string, string | string[]>);
export declare class StringCaster {
    source: Source;
    constructor(source: Source);
    private get;
    private getAll;
    int(key: string, options?: Parameters<typeof int>[1]): number | undefined;
    float(key: string, options?: Parameters<typeof float>[1]): number | undefined;
    number(key: string, options?: Parameters<typeof number>[1]): number | undefined;
    bool(key: string, options?: Parameters<typeof bool>[1]): boolean | undefined;
    string(key: string, options?: Parameters<typeof string>[1]): string | undefined;
    arrayOfInt(key: string, options?: Parameters<typeof arrayOfInt>[1]): number[] | undefined;
    arrayOfFloat(key: string, options?: Parameters<typeof arrayOfFloat>[1]): number[] | undefined;
    arrayOfNumber(key: string, options?: Parameters<typeof arrayOfNumber>[1]): number[] | undefined;
    arrayOfString(key: string, options?: Parameters<typeof arrayOfString>[1]): string[] | undefined;
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
