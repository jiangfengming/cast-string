import {
  int,
  float,
  number,
  bool,
  string,
  arrayOfInt,
  arrayOfFloat,
  arrayOfNumber,
  arrayOfString
} from '../src/index.mjs'

console.log(int('1.5'))
console.log(float('1.23'))
console.log(number('1e2'))
console.log(bool('yes'))
console.log(string('foo'))
console.log(arrayOfInt(['1', '1.5']))
console.log(arrayOfFloat(['1', '2.3']))
console.log(arrayOfNumber(['1', '1e2']))
console.log(arrayOfString(['foo', null]))
