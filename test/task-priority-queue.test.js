'use strict'

/* eslint-env mocha */

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { TaskPriorityQueue, promiseSleep: sleep } = require('../')

describe('TaskPriorityQueue tests', () => {
  const job = async (mts, i, arr) => {
    await sleep(mts)
    arr.push(i)
    return i
  }

  it('pushTask - should process promise and return result', async () => {
    const tq = new TaskPriorityQueue()
    const res = await tq.pushTask(async () => {
      await sleep(500)
      return 123
    }, 2)

    expect(res).to.be.equal(123)
  })

  it('pushTask - should work with non async functions', async () => {
    const tq = new TaskPriorityQueue()
    const res = await tq.pushTask(() => 123, 2)

    expect(res).to.be.equal(123)
  })

  it('pushTask - should work process items according to concurrency', async () => {
    const tq = new TaskPriorityQueue()

    const promises = []
    const process = []
    promises.push(tq.pushTask(() => job(500, 1, process), 2))
    promises.push(tq.pushTask(() => job(200, 2, process), 2))
    promises.push(tq.pushTask(() => job(700, 3, process), 2))
    promises.push(tq.pushTask(() => job(300, 4, process), 2))
    const res = await Promise.all(promises)

    expect(res).to.be.deep.equal([1, 2, 3, 4])
    expect(process).to.be.deep.equal([1, 2, 3, 4])
  })

  it('pushTask - should support parallel processing as well', async () => {
    const tq = new TaskPriorityQueue(3)

    const promises = []
    const process = []

    promises.push(tq.pushTask(() => job(3000, 1, process), 2))
    promises.push(tq.pushTask(() => job(5000, 2, process), 2))
    promises.push(tq.pushTask(() => job(4000, 3, process), 2))
    promises.push(tq.pushTask(() => job(1000, 4, process), 2))
    const res = await Promise.all(promises)

    expect(res).to.be.deep.equal([1, 2, 3, 4])
    expect(process).to.be.deep.equal([1, 3, 4, 2])
  }).timeout(10000)

  it('pushTask - should handle tasks based on priority according to concurrency', async () => {
    const tq = new TaskPriorityQueue()

    const promises = []
    const process = []

    promises.push(tq.pushTask(() => job(3000, 1, process), 2))
    promises.push(tq.pushTask(() => job(4000, 2, process), 1))
    promises.push(tq.pushTask(() => job(2000, 3, process), 2))
    promises.push(tq.pushTask(() => job(1000, 4, process), 1))
    const res = await Promise.all(promises)

    expect(res).to.be.deep.equal([1, 2, 3, 4])
    expect(process).to.be.deep.equal([2, 4, 1, 3])
  }).timeout(20000)

  it('pushTask - should handle tasks based on priority in parallel as well', async () => {
    const tq = new TaskPriorityQueue(2)

    const promises = []
    const process = []

    promises.push(tq.pushTask(() => job(2000, 1, process), 2))
    promises.push(tq.pushTask(() => job(4000, 2, process), 1))
    promises.push(tq.pushTask(() => job(2000, 3, process), 3))
    promises.push(tq.pushTask(() => job(3000, 4, process), 1))
    const res = await Promise.all(promises)

    expect(res).to.be.deep.equal([1, 2, 3, 4])
    expect(process).to.be.deep.equal([4, 2, 1, 3])
  }).timeout(20000)
}).timeout(7000)
