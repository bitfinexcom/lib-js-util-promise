'use strict'
/* eslint-env mocha */

const test = require('brittle')
const { waitForCondition, PromiseTimeoutError } = require('../index')

test('should resolve on condition success', async (t) => {
  const res = await waitForCondition(() => ({ status: 'OK' }))
  t.alike(res, { status: 'OK' })
})

test('should resolve on promise condition success', async (t) => {
  const res = await waitForCondition(async () => ({ status: 'OK' }))
  t.alike(res, { status: 'OK' })
})

test('should wait some time between checks', async (t) => {
  let iterations = 0
  const start = Date.now()
  const res = await waitForCondition(() => {
    iterations++
    return Date.now() - start > 375
  }, { intervalMs: 250 })
  t.alike(res, true)
  t.alike(iterations, 2)
})

test('should timeout after some time', async (t) => {
  const res = await waitForCondition(() => false, { timeoutMs: 200 }).catch(err => err)

  t.ok(res instanceof PromiseTimeoutError)
  t.is(res.message, 'condition did not happen after 200ms')
})
