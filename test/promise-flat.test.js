'use strict'

/* eslint-env mocha */

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { promiseFlat } = require('../')

describe('promise-flat tests', () => {
  it('promiseFlat - it should delegate resolve handle outside of promise', async () => {
    const { promise, resolve, reject } = promiseFlat()

    expect(promise).to.be.instanceOf(Promise)
    expect(resolve).to.be.a('function')
    expect(reject).to.be.a('function')

    setTimeout(() => {
      resolve('success')
    }, 500)

    const res = await promise
    expect(res).to.be.equal('success')
  })

  it('promiseFlat - it should delegate reject handle outside of promise', async () => {
    const { promise, resolve, reject } = promiseFlat()

    expect(promise).to.be.instanceOf(Promise)
    expect(resolve).to.be.a('function')
    expect(reject).to.be.a('function')

    setTimeout(() => {
      reject(new Error('failure'))
      resolve('success')
    }, 500)

    const res = await promise.then(() => true).catch((err) => err)
    expect(res).to.be.instanceOf(Error)
    expect(res.message).to.be.equal('failure')
  })
})
