'use strict'

/* eslint-env mocha */

const chai = require('chai').use(require('dirty-chai'))
const { setTimeout } = require('timers/promises')
const { expect } = chai
const { promiseMap } = require('../')

describe('promise-map tests', () => {
  it('promiseMap - it should exit once all are executed', async () => {
    const elements = [1, 2, 3]
    const runner = async ix => {
      await setTimeout(100)
      return ix
    }
    const results = await promiseMap(elements, runner, { concurrency: 2 })
    expect(results).to.deep.equal([1, 2, 3])
  }).timeout(5000)

  it('promiseMap - it should throw as soon as first once rejects', async () => {
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
      expect(e.message).to.equal('test')
      expect(executed).to.deep.equal([5])
    }
  }).timeout(5000)

  it('promiseMap - it should execute in batches', async () => {
    const executed = []
    const elements = [3, 5, 3, 5]
    const runner = async ix => {
      await setTimeout(ix * 100)
      executed.push(ix)
      return ix
    }
    const promise = promiseMap(elements, runner, { concurrency: 2 })
    await setTimeout(550)
    expect(executed).to.deep.equal([3, 5])
    await setTimeout(550)
    expect(executed).to.deep.equal([3, 5, 3, 5])
    const result = await promise
    expect(result).to.deep.equal([3, 5, 3, 5])
  }).timeout(5000)
})
