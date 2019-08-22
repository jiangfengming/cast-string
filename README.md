# cast-string
Cast query string to number and boolean.

## import

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
int(s, radix, defaults, throwIfInvalid = false)
```

Cast string to int using `parseInt()`.

If `parseInt()` returns `NaN`, an error would be thrown if `throwIfInvalid` is `true`, or `defaults` will be returned.

### float

```js
float(s, defaults, throwIfInvalid = false)
```

Cast string to float using `parseFloat()`.

### number

```js
number(s, defaults, throwIfInvalid = false)
```

Cast string to number using `Number()`.

### bool

```js
bool(s, defaults, throwIfInvalid = false)
```

Cast string to boolean.

Truthy values are `'1'`, `'true'`, `'yes'`, `''`.
Falsy values are `'0'`, `'false'`, `'no'`.

In query string, a param with empty value normally means `true`, for example

```js
const searchParams = new URL('https://www.example.com/list?recursive').searchParams
const isRecursive = bool(searchParams.get('recursive'))
```

If `s` is not truthy nor falsy, an error will be thrown if `throwIfInvalid` is `true`, or `defaults` will be returned.

### string

```js
string(i, defaults)
```

Cast any type to string.

If `i` is `null`/`undefined`, returns `defaults`.

### arrayOfInt

```js
arrayOfInt(a, radix, defaults, throwIfInvalid)
```

Cast array of string to array of int.

### arrayOfFloat

```js
arrayOfFloat(a, defaults, throwIfInvalid)
```

Cast array of string to array of float.

### arrayOfNumber

```js
arrayOfNumber(a, defaults, throwIfInvalid)
```

Cast array of string to array of number.

### arrayOfString

```js
arrayOfString(a, defaults)
```

Cast array of any type to array of string.

## License
[MIT](LICENSE)
