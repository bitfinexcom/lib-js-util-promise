'use strict'

/* eslint-env mocha */

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { promiseSleep, promiseTimeout, PromiseTimeoutError } = require('../')

describe('promise-timeout tests', () => {
  it('promiseTimeout - it should throw a PromiseTimeoutError error ' +
    'if promise is not resolved until specific time', async () => {
    const res = await promiseTimeout(
      promiseSleep(1000, 'wrong result'), 500
    ).catch(err => err)

    expect(res).to.be.instanceOf(PromiseTimeoutError)
    expect(res.message).to.be.equal('ERR_PROMISE_TIMEOUT')
  }).timeout(5000)

  it('promiseTimeout - it should support custom error messages when throwing ' +
    'a PromiseTimeoutError error', async () => {
    const res = await promiseTimeout(
      promiseSleep(1000, 'wrong result'), 500, 'User error'
    ).catch(err => err)

    expect(res).to.be.instanceOf(PromiseTimeoutError)
    expect(res.message).to.be.equal('User error')
  }).timeout(5000)

  it('promiseTimeout - it should return promise value in case ' +
    'if it\'s resolved before timeout', async () => {
    const res = await promiseTimeout(promiseSleep(500, 'success'), 1000)
    expect(res).to.be.equal('success')
  }).timeout(5000)

  it('promiseTimeout - it should support async functions', async () => {
    const res = await promiseTimeout(async () => { return 33 }, 1000)
    expect(res).to.be.equal(33)
  })

  it('promiseTimeout - it should support normal functions', async () => {
    const res = await promiseTimeout(() => { return 33 }, 1000)
    expect(res).to.be.equal(33)
  })

  it('promiseTimeout - it should support immediate values', async () => {
    const res = await promiseTimeout(33, 1000)
    expect(res).to.be.equal(33)
  })

  it('promiseTimeout - it should not interfere with default functionality of promise', async () => {
    const res = await promiseTimeout(
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('ERR_SIMULATED')), 500)
      }),
      1000
    ).catch(err => err)

    expect(res).to.be.instanceOf(Error)
    expect(res.message).to.be.equal('ERR_SIMULATED')
  })
})
