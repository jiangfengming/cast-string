# cast-string
Convert URL query string to number and boolean.

## Import
### ES Module
Imort named exports:
```ts
import {
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
} from 'cast-string';

const id = int(urlSearchParams.get('id'));
```

Import default export:
```ts
import cast from 'case-string';

const id = cast.int(urlSearchParams.get('id'));
```

### CommonJS
```ts
const {
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
} = require('cast-string');
```

NOTE: This package is written in ES2020 syntax and not transpiled. It is only tested on Node.js v14+.
To use it in old browsers, you need to transpile the code using tool such as Babel.
## Functions

* [int](#int)
* [float](#float)
* [number](#number)
* [bool](#bool)
* [string](#string)
* [arrayOfInt](#arrayofint)
* [arrayOfFloat](#arrayoffloat)
* [arrayOfNumber](#arrayofnumber)
* [arrayOfString](#arrayofstring)
* [StringCaster](#stringcaster)

### int

```ts
function int(
  str: string | null | undefined,
  options: {
    radix?: number,
    default?: number
  } = {}
): number | undefined
```

Convert `str` to number using `parseInt()`. If `parseInt()` returns `NaN`, `options.default` will be returned.

```ts
int('10.1cm')
// -> 10

int('10.1', { radix: 2 })
// -> 2

int('0xA.1')
// -> 10

int('a')
// -> undefined

int('a', { default: 10 })
// -> 10
```

### float

```ts
function float(
  str: string | null | undefined,
  options: { default?: number } = {}
): number | undefined
```

Convert `str` to number using `parseFloat()`.

```ts
float('10.1cm')
// -> 10.1

float('0xA.1')
// -> 0

float('a')
// -> undefined

float('a', { default: 10.1 })
// -> 10.1
```

### number

```ts
function number(
  str: string | null | undefined,
  options: { default?: number } = {}
): number | undefined
```

Convert `str` to number using `Number()`.

```ts
number('10.1')
// -> 10.1

number('10.1cm')
// -> undefined

number('1e2')
// -> 100

number('a', { default: 10.1 })
// -> 10.1
```

### bool

```ts
function bool(
  str: string | null | undefined,
  options: {
    empty?: boolean,
    default?: boolean
  } = {}
): boolean | undefined
```

Convert `str` to boolean.

Truthy values are `'1'`, `'true'`, `'yes'`.
Falsy values are `'0'`, `'false'`, `'no'`.

If `empty` is not `false`, empty string `''` is a truthy value.
In query string, a param with empty value normally means `true`, for example

```ts
const searchParams = new URL('https://www.example.com/list?recursive').searchParams
const isRecursive = bool(searchParams.get('recursive'))
```

If `empty` is `false`, then empty string is a falsy value.

If `str` is not truthy nor falsy, `options.default` will be returned.

```ts
bool('1')
// -> true

bool('yes')
// -> true

bool('true')
// -> true

bool('')
// -> true

bool('', { empty: false })
// -> false

bool('a')
// -> undefined

bool('a', { default: false })
// -> false
```

### string

```ts
function string(
  str: string | null | undefined,
  options: { default?: string } = {}
): string | undefined
```

If `str` is a string, return as is.
If `str` is `null`/`undefined`, return `options.default`.

```ts
string('foo')
// -> 'foo'

string('')
// -> ''

string(undefined)
// -> undefined

string(null)
// -> undefined

string(null, { default: 'a' })
// -> 'a'
```

### arrayOfInt

```ts
function arrayOfInt(
  str: string | string[] | null | undefined,
  options: {
    radix?: number,
    default?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined
```

Convert `str` to an array of number using `parseInt()`.

```ts
arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a', null, undefined])
// -> [1, 10, 11]

arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a', null, undefined], { radix: 2, dedup: false })
// -> [1, 1, 2, 0]

arrayOfInt('1')
// -> [1]

arrayOfInt('1,1,2,3', { splitComma: true })
// -> [1, 2, 3]

arrayOfInt(['1,1,2', '3'], { dedup: false, splitComma: true })
// -> [1, 1, 2, 3]

arrayOfInt([])
// -> undefined

arrayOfInt([], { default: [] })
// -> []

arrayOfInt(null)
// -> undefined

arrayOfInt(null, { default: [] })
// -> []
```

### arrayOfFloat

```ts
function arrayOfFloat(
  str: string | string[] | null | undefined,
  options: {
    default?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined
```

Convert `str` to an array of number using `parseFloat()`.

```ts
arrayOfFloat(['1', '1', '10.1', '', null, undefined])
// -> [1, 10.1]

arrayOfFloat(['1', '1', '10.1', '', null, undefined], { dedup: false })
// -> [1, 1, 10.1]

arrayOfFloat([])
// -> undefined

arrayOfFloat([], { default: [] })
// -> []

arrayOfFloat(null)
// -> undefined

arrayOfFloat(null, { default: [] })
// -> []

arrayOfFloat('10.1')
// -> [10.1]

arrayOfFloat('1.1,1.1,2.2,3.3', { splitComma: true })
// -> [1.1, 2.2, 3.3]

arrayOfFloat(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true })
// -> [1.1, 1.1, 2.2, 3.3]
```

### arrayOfNumber

```ts
function arrayOfNumber(
  str: string | string[] | null | undefined,
  options: {
    default?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): number[] | undefined
```

Convert `str` to an array of number using `Number()`.

```ts
arrayOfNumber(['1', '1', '1.1', '2cm', '1e2', '', 'a', null, undefined])
// -> [1, 1.1, 100, 0]

arrayOfNumber(['1', '1', '0', '', null, undefined], { dedup: false })
// -> [1, 1, 0, 0]

arrayOfNumber([])
// -> undefined

arrayOfNumber([], { default: [] })
// -> []

arrayOfNumber(null)
// -> undefined

arrayOfNumber(null, { default: [] })
// -> []

arrayOfNumber('10.1')
// -> [10.1]

arrayOfNumber('1.1,1.1,2.2,3.3', { splitComma: true })
// -> [1.1, 2.2, 3.3]

arrayOfNumber(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true })
// -> [1.1, 1.1, 2.2, 3.3]
```

### arrayOfString

```ts
function arrayOfString(
  str: string | string[] | null | undefined,
  options: {
    default?: undefined,
    dedup?: boolean,
    splitComma?: boolean
  } = {}
): string[] | undefined
```

Convert `str` to an array of string.

```ts
arrayOfString(['foo', 'foo', '', null, undefined])
// -> ['foo', '']

arrayOfString(['foo', 'foo', '', null, undefined], { dedup: false })
// -> ['foo', 'foo', '']

arrayOfString('foo,foo,bar', { splitComma: true })
// -> ['foo', 'bar']

arrayOfString(['foo,foo,bar', 'baz'], { dedup: false, splitComma: true })
// -> ['foo', 'foo', 'bar', 'baz']
```

### StringCaster

```ts
constructor(source:
  URLSearchParams |
  Record<string, string | string[]> |
  (() => URLSearchParams | Record<string, string | string[]>)
)
```

Create a cast object from `source`.
`source` can be a [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object.
Or an object of key-value pairs,
Or a function that returns a URLSearchParams or key-value pair object.

```ts
const params = new StringCaster(new URLSearchParams('a=1&b=1&b=2&c=1,2,3'))

params.int('a')
// -> 1

params.arrayOfInt('b')
// -> [1, 2]

params.arrayOfInt('c', { splitComma: true })
// -> [1, 2, 3]
```

```ts
const params = new StringCaster({
  a: '1',
  b: ['1', '2'],
  c: '1,2,3'
})

params.int('a')
// -> 1

params.arrayOfInt('b')
// -> [1, 2]

params.arrayOfInt('c', { splitComma: true })
// -> [1, 2, 3]
```

```ts
const params = new StringCaster(() => new URLSearchParams('a=1&b=1&b=2&c=1,2,3'))

params.int('a')
// --> 1

params.arrayOfInt('b')
// -> [1, 2]

params.arrayOfInt('c', { splitComma: true })
// -> [1, 2, 3]
```

## License
[MIT](LICENSE)
