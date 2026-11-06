'use strict'

/* eslint-env mocha */

const test = require('brittle')
const { resolvePromiseCb } = require('../')

test('should handle callback errors', (t) => {
  t.plan(1)

  resolvePromiseCb(new Error('foo'), null, (err) => {
    t.is(err.message, 'foo')
  })
})

test('should handle promise rejections', async (t) => {
  await t.exception(resolvePromiseCb(new Error('foo')), /foo/)
})

test('should handle callback results', (t) => {
  t.plan(2)

  resolvePromiseCb(null, 'foo', (err, res) => {
    t.is(err, null)
    t.is(res, 'foo')
  })
})

test('should handle promise resolves', async (t) => {
  const res = await resolvePromiseCb(null, 'foo')
  t.is(res, 'foo')
})
