//gives tool to create test
const { test } = require('node:test')
// a judge....checks if this is correct or wrong
const assert = require('node:assert')

//bring reverse function into the test file
const reverse = require('../utils/for_testing').reverse

//the actual test
test('reverse of a', () => {
  const result = reverse('a')

  assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
  const result = reverse('react')

  assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
  const result = reverse('saippuakauppias')

  assert.strictEqual(result, 'saippuakauppias')
})