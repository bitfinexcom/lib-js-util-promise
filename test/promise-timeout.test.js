'use strict'

/* eslint-env mocha */

const test = require('brittle')
const { promiseSleep, promiseTimeout, PromiseTimeoutError } = require('../')

test('promiseTimeout - it should throw a PromiseTimeoutError error ' +
  'if promise is not resolved until specific time', { timeout: 5000 }, async (t) => {
  const res = await promiseTimeout(
    promiseSleep(1000, 'wrong result'), 500
  ).catch(err => err)

  t.ok(res instanceof PromiseTimeoutError)
  t.is(res.message, 'ERR_PROMISE_TIMEOUT')
})

test('promiseTimeout - it should support custom error messages when throwing ' +
  'a PromiseTimeoutError error', { timeout: 5000 }, async (t) => {
  const res = await promiseTimeout(
    promiseSleep(1000, 'wrong result'), 500, 'User error'
  ).catch(err => err)

  t.ok(res instanceof PromiseTimeoutError)
  t.is(res.message, 'User error')
})

test('promiseTimeout - it should return promise value in case ' +
  'if it\'s resolved before timeout', { timeout: 5000 }, async (t) => {
  const res = await promiseTimeout(promiseSleep(500, 'success'), 1000)
  t.is(res, 'success')
})

test('promiseTimeout - it should support async functions', async (t) => {
  const res = await promiseTimeout(async () => { return 33 }, 1000)
  t.is(res, 33)
})

test('promiseTimeout - it should support normal functions', async (t) => {
  const res = await promiseTimeout(() => { return 33 }, 1000)
  t.is(res, 33)
})

test('promiseTimeout - it should support immediate values', async (t) => {
  const res = await promiseTimeout(33, 1000)
  t.is(res, 33)
})

test('promiseTimeout - it should not interfere with default functionality of promise', async (t) => {
  const res = await promiseTimeout(
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('ERR_SIMULATED')), 500)
    }),
    1000
  ).catch(err => err)

  t.ok(res instanceof Error)
  t.is(res.message, 'ERR_SIMULATED')
})
