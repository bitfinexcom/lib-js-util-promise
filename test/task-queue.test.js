'use strict'

/* eslint-env mocha */

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { TaskQueue, promiseSleep: sleep } = require('../')

describe('TaskQueue tests', () => {
  const job = async (mts, i, arr) => {
    await sleep(mts)
    arr.push(i)
    return i
  }

  it('pushTask - should process promise and return result', async () => {
    const tq = new TaskQueue()
    const res = await tq.pushTask(async () => {
      await sleep(500)
      return 123
    })

    expect(res).to.be.equal(123)
  })

  it('pushTask - should work with non async functions', async () => {
    const tq = new TaskQueue()
    const res = await tq.pushTask(() => 123)

    expect(res).to.be.equal(123)
  })

  it('pushTask - should work process items according to concurrency', async () => {
    const tq = new TaskQueue()

    const promises = []
    const process = []
    promises.push(tq.pushTask(() => job(500, 1, process)))
    promises.push(tq.pushTask(() => job(200, 2, process)))
    promises.push(tq.pushTask(() => job(700, 3, process)))
    promises.push(tq.pushTask(() => job(300, 4, process)))
    const res = await Promise.all(promises)

    expect(res).to.be.deep.equal([1, 2, 3, 4])
    expect(process).to.be.deep.equal([1, 2, 3, 4])
  })

  it('pushTask - should support parallel processing as well', async () => {
    const tq = new TaskQueue(3)

    const promises = []
    const process = []

    promises.push(tq.pushTask(() => job(3000, 1, process)))
    promises.push(tq.pushTask(() => job(5000, 2, process)))
    promises.push(tq.pushTask(() => job(4000, 3, process)))
    promises.push(tq.pushTask(() => job(1000, 4, process)))
    const res = await Promise.all(promises)

    expect(res).to.be.deep.equal([1, 2, 3, 4])
    expect(process).to.be.deep.equal([1, 3, 4, 2])
  }).timeout(10000)
}).timeout(7000)
