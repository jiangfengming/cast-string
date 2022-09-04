import assert from 'node:assert';
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
} from '../src/index.js';

assert.strictEqual(int('10.1cm'), 10);
assert.strictEqual(int('10.1', { radix: 2 }), 2);
assert.strictEqual(int('0xA.1'), 10);
assert.strictEqual(int('a'), undefined);
assert.strictEqual(int('a', { default: 10 }), 10);

assert.strictEqual(float('10.1cm'), 10.1);
assert.strictEqual(float('0xA.1'), 0);
assert.strictEqual(float('a'), undefined);
assert.strictEqual(float('a', { default: 10.1 }), 10.1);

assert.strictEqual(number('10.1'), 10.1);
assert.strictEqual(number('10.1cm'), undefined);
assert.strictEqual(number('1e2'), 100);
assert.strictEqual(number('a', { default: 10.1 }), 10.1);

assert.strictEqual(bool('1'), true);
assert.strictEqual(bool('yes'), true);
assert.strictEqual(bool('true'), true);
assert.strictEqual(bool(''), true);
assert.strictEqual(bool('', { empty: false }), false);
assert.strictEqual(bool('a'), undefined);
assert.strictEqual(bool('a', { default: false }), false);

assert.strictEqual(string('foo'), 'foo');
assert.strictEqual(string(''), '');
assert.strictEqual(string(undefined), undefined);
assert.strictEqual(string(null), undefined);
assert.strictEqual(string(null, { default: 'a' }), 'a');

assert.deepStrictEqual(arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a']), [1, 10, 11]);
assert.deepStrictEqual(arrayOfInt(['1', '1cm', '10.1cm', '0xB.1', 'a'], { radix: 2, dedup: false }), [1, 1, 2, 0]);
assert.deepStrictEqual(arrayOfInt([]), undefined);
assert.deepStrictEqual(arrayOfInt([], { default: [] }), []);
assert.deepStrictEqual(arrayOfInt(null), undefined);
assert.deepStrictEqual(arrayOfInt(null, { default: [] }), []);
assert.deepStrictEqual(arrayOfInt('1'), [1]);
assert.deepStrictEqual(arrayOfInt('1,1,2,3', { splitComma: true }), [1, 2, 3]);
assert.deepStrictEqual(arrayOfInt(['1,1,2', '3'], { dedup: false, splitComma: true }), [1, 1, 2, 3]);

assert.deepStrictEqual(arrayOfFloat(['1', '1', '10.1', '']), [1, 10.1]);
assert.deepStrictEqual(arrayOfFloat(['1', '1', '10.1', ''], { dedup: false }), [1, 1, 10.1]);
assert.deepStrictEqual(arrayOfFloat([]), undefined);
assert.deepStrictEqual(arrayOfFloat([], { default: [] }), []);
assert.deepStrictEqual(arrayOfFloat(null), undefined);
assert.deepStrictEqual(arrayOfFloat(null, { default: [] }), []);
assert.deepStrictEqual(arrayOfFloat('10.1'), [10.1]);
assert.deepStrictEqual(arrayOfFloat('1.1,1.1,2.2,3.3', { splitComma: true }), [1.1, 2.2, 3.3]);
assert.deepStrictEqual(arrayOfFloat(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true }), [1.1, 1.1, 2.2, 3.3]);

assert.deepStrictEqual(arrayOfNumber(['1', '1', '1.1', '2cm', '1e2', '', 'a']), [1, 1.1, 100, 0]);
assert.deepStrictEqual(arrayOfNumber(['1', '1', '0', ''], { dedup: false }), [1, 1, 0, 0]);
assert.deepStrictEqual(arrayOfNumber([]), undefined);
assert.deepStrictEqual(arrayOfNumber([], { default: [] }), []);
assert.deepStrictEqual(arrayOfNumber(null), undefined);
assert.deepStrictEqual(arrayOfNumber(null, { default: [] }), []);
assert.deepStrictEqual(arrayOfNumber('10.1'), [10.1]);
assert.deepStrictEqual(arrayOfNumber('1.1,1.1,2.2,3.3', { splitComma: true }), [1.1, 2.2, 3.3]);
assert.deepStrictEqual(arrayOfNumber(['1.1,1.1,2.2', '3.3'], { dedup: false, splitComma: true }), [1.1, 1.1, 2.2, 3.3]);

assert.deepStrictEqual(arrayOfString(['foo', 'foo', '']), ['foo', '']);
assert.deepStrictEqual(arrayOfString(['foo', 'foo', ''], { dedup: false }), ['foo', 'foo', '']);
assert.deepStrictEqual(arrayOfString('foo,foo,bar', { splitComma: true }), ['foo', 'bar']);
assert.deepStrictEqual(arrayOfString(['foo,foo,bar', 'baz'], { dedup: false, splitComma: true }), ['foo', 'foo', 'bar', 'baz']);

const query = {
  i: '1',
  ai: ['1', '2'],
  ai2: '1,2,3'
};

const caster = new StringCaster(query);
assert.strictEqual(caster.int('i'), 1);
assert.deepStrictEqual(caster.arrayOfInt('ai'), [1, 2]);
assert.deepStrictEqual(caster.arrayOfInt('ai2', { splitComma: true }), [1, 2, 3]);
assert.strictEqual(caster.source, query);

const search = new URLSearchParams('i=1&ai=1&ai=2&ai2=1,2,3');
const caster2 = new StringCaster(search);
assert.strictEqual(caster2.int('i'), 1);
assert.deepStrictEqual(caster2.arrayOfInt('ai'), [1, 2]);
assert.deepStrictEqual(caster2.arrayOfInt('ai2', { splitComma: true }), [1, 2, 3]);

const caster3 = new StringCaster(() => query);
assert.strictEqual(caster3.int('i'), 1);
assert.deepStrictEqual(caster3.arrayOfInt('ai'), [1, 2]);
assert.deepStrictEqual(caster3.arrayOfInt('ai2', { splitComma: true }), [1, 2, 3]);
