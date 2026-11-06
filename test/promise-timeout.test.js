'use strict'

/* eslint-env mocha */

const test = require('brittle')
const { promiseSleep } = require('../')

test('promiseSleep - it should resolve after around 2000 ms', { timeout: 5000 }, async (t) => {
  const ts1 = Date.now()
  await promiseSleep(1000)
  const ts2 = Date.now()

  t.is(/^10\d\d$/.test((ts2 - ts1).toString()), true) // 10xx ms
})

test('promiseSleep - it should resolve with specific value if specified', { timeout: 5000 }, async (t) => {
  const ts1 = Date.now()
  const res = await promiseSleep(1000, 21)
  const ts2 = Date.now()

  t.is(/^10\d\d$/.test((ts2 - ts1).toString()), true) // 10xx ms
  t.is(res, 21)
})
