import assert from 'assert'

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
  createCastObject
} from '../src/index.mjs'

assert.strictEqual(int('10.1cm'), 10)
assert.strictEqual(int('10.1', { radix: 2 }), 2)
assert.strictEqual(int('0xA.1'), 10)
assert.strictEqual(int('a'), undefined)
assert.strictEqual(int('a', { defaults: 10 }), 10)
assert.throws(() => int('a', { throws: new Error('Invalid parameter x') }))

assert.strictEqual(float('10.1cm'), 10.1)
assert.strictEqual(float('0xA.1'), 0)
assert.strictEqual(float('a'), undefined)
assert.strictEqual(float('a', { defaults: 10.1 }), 10.1)
assert.throws(() => float('a', { throws: new Error('Invalid parameter x') }))

assert.strictEqual(number('10.1'), 10.1)
assert.strictEqual(number('10.1cm'), undefined)
assert.strictEqual(number('1e2'), 100)
assert.strictEqual(number('a', { defaults: 10.1 }), 10.1)
assert.throws(() => number('a', { throws: new Error('Invalid parameter x') }))

assert.strictEqual(bool('1'), true)
assert.strictEqual(bool('yes'), true)
assert.strictEqual(bool('true'), true)
assert.strictEqual(bool(''), true)
assert.strictEqual(bool('', { empty: false }), false)
assert.strictEqual(bool('', { empty: null }), undefined)
assert.strictEqual(bool('', { empty: null, defaults: false }), false)
assert.strictEqual(bool('a'), undefined)
assert.strictEqual(bool('a', { defaults: false }), false)
assert.throws(() => bool('a', { throws: new Error('Invalid parameter x') }))

assert.strictEqual(string('foo'), 'foo')
assert.strictEqual(string(''), '')
assert.strictEqual(string(undefined), undefined)
assert.strictEqual(string(null), undefined)
assert.strictEqual(string(null, { defaults: 'a' }), 'a')

assert.deepStrictEqual(arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a', null, undefined]), [1, 10, 11])
assert.deepStrictEqual(arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a', null, undefined], { radix: 2, dedup: false }), [1, 1, 2, 0])
assert.deepStrictEqual(arrayOfInt([]), undefined)
assert.deepStrictEqual(arrayOfInt([], { defaults: [] }), [])
assert.deepStrictEqual(arrayOfInt(null), undefined)
assert.deepStrictEqual(arrayOfInt(null, { defaults: [] }), [])
assert.deepStrictEqual(arrayOfInt('1'), [1])
assert.deepStrictEqual(arrayOfInt('1,1,2,3', { splitComma: true }), [1, 2, 3])
assert.deepStrictEqual(arrayOfInt(['1,1,2', '3'], { dedup: false, splitComma: true }), [1, 1, 2, 3])

assert.deepStrictEqual(arrayOfFloat(['1', '1', '10.1', '', null, undefined]), [1, 10.1])
assert.deepStrictEqual(arrayOfFloat(['1', '1', '10.1', '', null, undefined], { dedup: false }), [1, 1, 10.1])
assert.deepStrictEqual(arrayOfFloat([]), undefined)
assert.deepStrictEqual(arrayOfFloat([], { defaults: [] }), [])
assert.deepStrictEqual(arrayOfFloat(null), undefined)
assert.deepStrictEqual(arrayOfFloat(null, { defaults: [] }), [])
assert.deepStrictEqual(arrayOfFloat('10.1'), [10.1])
assert.deepStrictEqual(arrayOfFloat('1.1,1.1,2.2,3.3', { splitComma: true }), [1.1, 2.2, 3.3])
assert.deepStrictEqual(arrayOfFloat(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true }), [1.1, 1.1, 2.2, 3.3])

assert.deepStrictEqual(arrayOfNumber(['1', '1', '1.1', '2cm', '1e2', '', 'a', null, undefined]), [1, 1.1, 100, 0])
assert.deepStrictEqual(arrayOfNumber(['1', '1', '0', '', null, undefined], { dedup: false }), [1, 1, 0, 0])
assert.deepStrictEqual(arrayOfNumber([]), undefined)
assert.deepStrictEqual(arrayOfNumber([], { defaults: [] }), [])
assert.deepStrictEqual(arrayOfNumber(null), undefined)
assert.deepStrictEqual(arrayOfNumber(null, { defaults: [] }), [])
assert.deepStrictEqual(arrayOfNumber('10.1'), [10.1])
assert.deepStrictEqual(arrayOfNumber('1.1,1.1,2.2,3.3', { splitComma: true }), [1.1, 2.2, 3.3])
assert.deepStrictEqual(arrayOfNumber(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true }), [1.1, 1.1, 2.2, 3.3])

assert.deepStrictEqual(arrayOfString(['foo', 'foo', '', null, undefined]), ['foo', ''])
assert.deepStrictEqual(arrayOfString(['foo', 'foo', '', null, undefined], { dedup: false }), ['foo', 'foo', ''])
assert.deepStrictEqual(arrayOfString('foo,foo,bar', { splitComma: true }), ['foo', 'bar'])
assert.deepStrictEqual(arrayOfString(['foo,foo,bar', 'baz'], { dedup: false, splitComma: true }), ['foo', 'foo', 'bar', 'baz'])

const query = {
  i: '1',
  ai: ['1', '2'],
  ai2: '1,2,3'
}

const castObj = createCastObject(query)
assert.strictEqual(castObj.int('i'), 1)
assert.deepStrictEqual(castObj.arrayOfInt('ai'), [1, 2])
assert.deepStrictEqual(castObj.arrayOfInt('ai2', { splitComma: true }), [1, 2, 3])

const search = new URLSearchParams('i=1&ai=1&ai=2&ai2=1,2,3')
const castObj2 = createCastObject(search)
assert.strictEqual(castObj2.int('i'), 1)
assert.deepStrictEqual(castObj2.arrayOfInt('ai'), [1, 2])
assert.deepStrictEqual(castObj2.arrayOfInt('ai2', { splitComma: true }), [1, 2, 3])

const castObj3 = createCastObject(() => query)
assert.strictEqual(castObj3.int('i'), 1)
assert.deepStrictEqual(castObj3.arrayOfInt('ai'), [1, 2])
assert.deepStrictEqual(castObj3.arrayOfInt('ai2', { splitComma: true }), [1, 2, 3])
