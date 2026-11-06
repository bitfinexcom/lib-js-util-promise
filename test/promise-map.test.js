'use strict'

/* eslint-env mocha */

const test = require('brittle')
const { setTimeout } = require('timers/promises')
const { promiseMap } = require('../')

test('promiseMap - it should exit once all are executed', { timeout: 5000 }, async (t) => {
  const elements = [1, 2, 3]
  const runner = async ix => {
    await setTimeout(100)
    return ix
  }
  const results = await promiseMap(elements, runner, { concurrency: 2 })
  t.alike(results, [1, 2, 3])
})

test('promiseMap - it should throw as soon as first once rejects', { timeout: 5000 }, async (t) => {
  const executed = []
  const elements = [5, new Error('test'), 5]
  const runner = async ix => {
    if (ix instanceof Error) {
      await setTimeout(300)
      throw ix
    } else {
      await setTimeout(ix * 100)
    }
    executed.push(ix)
    return ix
  }
  try {
    await promiseMap(elements, runner, { concurrency: 2 })
    throw new Error('error was not received')
  } catch (e) {
    if (e.message === 'error was not received') {
      throw e
    }
    t.is(e.message, 'test')
    t.alike(executed, [5])
  }
})

test('promiseMap - it should execute in batches', { timeout: 5000 }, async (t) => {
  const executed = []
  const elements = [3, 5, 3, 5]
  const runner = async ix => {
    await setTimeout(ix * 100)
    executed.push(ix)
    return ix
  }
  const promise = promiseMap(elements, runner, { concurrency: 2 })
  await setTimeout(550)
  t.alike(executed, [3, 5])
  await setTimeout(550)
  t.alike(executed, [3, 5, 3, 5])
  const result = await promise
  t.alike(result, [3, 5, 3, 5])
})
