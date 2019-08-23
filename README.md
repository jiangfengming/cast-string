# cast-string
Cast query string to number and boolean.

* [Import](#import)
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
* [License](#license)

## Import

ES Module

```js
import { int } from 'cast-string' 
```

Node.js

```js
const { int } = require('cast-string')
```

## Functions

### int

```js
int(s, { radix, defaults, throws })
```

Cast string to int using `parseInt()`.

If `parseInt()` returns `NaN`, `throws` would be thrown if it is defined, or `defaults` will be returned.

```js
int('10.1cm')
// -> 10

int('10.1', { radix: 2 })
// -> 2

int('0xA.1')
// -> 10

int('a')
// -> undefined

int('a', { defaults: 10 })
// -> 10

try {
  int('a', { throws: new Error('Invalid parameter x') })
} catch (e) {
  e.message // Invalid parameter x
}
```

### float

```js
float(s, { defaults, throws })
```

Cast string to float using `parseFloat()`.

```js
float('10.1cm')
// -> 10.1

float('0xA.1')
// -> 0

float('a')
// -> undefined

float('a', { defaults: 10.1 })
// -> 10.1

try {
  float('a', { throws: new Error('Invalid parameter x') })
} catch (e) {
  e.message // Invalid parameter x
}
```

### number

```js
number(s, { defaults, throws })
```

Cast string to number using `Number()`.

```js
number('10.1')
// -> 10.1

number('10.1cm')
// -> undefined

number('1e2')
// -> 100

number('a', { defaults: 10.1 })
// -> 10.1

try {
  number('a', { throws: new Error('Invalid parameter x') })
} catch (e) {
  e.message // Invalid parameter x
}
```

### bool

```js
bool(s, { empty = true, defaults, throws })
```

Cast string to boolean.

Truthy values are `'1'`, `'true'`, `'yes'`.
Falsy values are `'0'`, `'false'`, `'no'`.

If `empty` is `true`(default), empty string `''` is a truthy value.
In query string, a param with empty value normally means `true`, for example

```js
const searchParams = new URL('https://www.example.com/list?recursive').searchParams
const isRecursive = bool(searchParams.get('recursive'))
```

If `empty` is `false`, then empty string is a falsy value.

If `s` is not truthy nor falsy, `throws` would be thrown if it is defined, or `defaults` will be returned.

```js
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

bool('', { empty: null })
// -> undefined

bool('', { empty: null, defaults: false })
// -> false

bool('a')
// -> undefined

bool('a', { defaults: false })
// -> false

try {
  bool('a', { throws: new Error('Invalid parameter x') })
} catch (e) {
  e.message // Invalid parameter x
}
```

### string

```js
string(v, { defaults })
```

Cast any type to string.

If `v` is `null`/`undefined`, returns `defaults`.


```js
string('foo')
// -> 'foo'

string('')
// -> ''

string(undefined)
// -> undefined

string(null)
// -> undefined

string(null, { defaults: 'a' })
// -> 'a'
```

### arrayOfInt

```js
arrayOfInt(a, { radix, defaults, dedup, splitComma, throws })
```

Cast array of string to array of int using `parseInt()`.

```js
arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a', null, undefined])
// -> [1, 10, 11]

arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a', null, undefined], { radix: 2, dedup: false })
// -> [1, 1, 2, 0]

arrayOfInt([])
// -> undefined

arrayOfInt([], { defaults: [] })
// -> []

arrayOfInt(null)
// -> undefined

arrayOfInt(null, { defaults: [] })
// -> []

arrayOfInt('1')
// -> [1]

arrayOfInt('1,1,2,3', { splitComma: true })
// -> [1, 2, 3]

arrayOfInt(['1,1,2', '3'], { dedup: false, splitComma: true })
// -> [1, 1, 2, 3]
```

### arrayOfFloat

```js
arrayOfFloat(a, { defaults, dedup, splitComma, throws })
```

Cast array of string to array of float using `parseFloat()`.

```js
arrayOfFloat(['1', '1', '10.1', '', null, undefined])
// -> [1, 10.1]

arrayOfFloat(['1', '1', '10.1', '', null, undefined], { dedup: false })
// -> [1, 1, 10.1]

arrayOfFloat([])
// -> undefined

arrayOfFloat([], { defaults: [] })
// -> []

arrayOfFloat(null)
// -> undefined

arrayOfFloat(null, { defaults: [] })
// -> []

arrayOfFloat('10.1')
// -> [10.1]

arrayOfFloat('1.1,1.1,2.2,3.3', { splitComma: true })
// -> [1.1, 2.2, 3.3]

arrayOfFloat(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true })
// -> [1.1, 1.1, 2.2, 3.3]
```

### arrayOfNumber

```js
arrayOfNumber(a, { defaults, dedup, splitComma, throws })
```

Cast array of string to array of number using `Number()`.

```js
arrayOfNumber(['1', '1', '1.1', '2cm', '1e2', '', 'a', null, undefined])
// -> [1, 1.1, 100, 0]

arrayOfNumber(['1', '1', '0', '', null, undefined], { dedup: false })
// -> [1, 1, 0, 0]

arrayOfNumber([])
// -> undefined

arrayOfNumber([], { defaults: [] })
// -> []

arrayOfNumber(null)
// -> undefined

arrayOfNumber(null, { defaults: [] })
// -> []

arrayOfNumber('10.1')
// -> [10.1]

arrayOfNumber('1.1,1.1,2.2,3.3', { splitComma: true })
// -> [1.1, 2.2, 3.3]

arrayOfNumber(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true })
// -> [1.1, 1.1, 2.2, 3.3]
```

### arrayOfString

```js
arrayOfString(a, { defaults, dedup, splitComma })
```

Cast array of any type to array of string.

```js
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

```js
new StringCaster(obj)
```

Creates a cast object from `obj`.
`obj` can be a collection of key and value pairs, for example:

```js
{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

Or a [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object.
Or a function that returns above types.

```js
const query = {
  i: '1',
  ai: ['1', '2'],
  ai2: '1,2,3'
}

const caster = new StringCaster(query)

caster.int('i')
// -> 1

caster.arrayOfInt('ai')
// -> [1, 2]

caster.arrayOfInt('ai2', { splitComma: true })
// -> [1, 2, 3]

caster.source
// -> query

const search = new URLSearchParams('i=1&ai=1&ai=2&ai2=1,2,3')
const caster2 = new StringCaster(search)

caster2.int('i')
// -> 1

caster2.arrayOfInt('ai')
// -> [1, 2]

caster2.arrayOfInt('ai2', { splitComma: true })
// -> [1, 2, 3]

const caster3 = new StringCaster(() => query)

caster3.int('i')
// --> 1

caster3.arrayOfInt('ai')
// -> [1, 2]

caster3.arrayOfInt('ai2', { splitComma: true })
// -> [1, 2, 3]
```

## License
[MIT](LICENSE)
