'use strict'

/* eslint-env mocha */

const test = require('brittle')
const { promiseFlat } = require('../')

test('promiseFlat - it should delegate resolve handle outside of promise', async (t) => {
  const { promise, resolve, reject } = promiseFlat()

  t.ok(promise instanceof Promise)
  t.is(typeof resolve, 'function')
  t.is(typeof reject, 'function')

  setTimeout(() => {
    resolve('success')
  }, 500)

  const res = await promise
  t.is(res, 'success')
})

test('promiseFlat - it should delegate reject handle outside of promise', async (t) => {
  const { promise, resolve, reject } = promiseFlat()

  t.ok(promise instanceof Promise)
  t.is(typeof resolve, 'function')
  t.is(typeof reject, 'function')

  setTimeout(() => {
    reject(new Error('failure'))
    resolve('success')
  }, 500)

  const res = await promise.then(() => true).catch((err) => err)
  t.ok(res instanceof Error)
  t.is(res.message, 'failure')
})
