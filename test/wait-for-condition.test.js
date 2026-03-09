'use strict'
/* eslint-env mocha */

const { expect } = require('chai')
const { waitForCondition, PromiseTimeoutError } = require('../index')

describe('waitForCondition', () => {
  it('should resolve on condition success', async () => {
    const res = await waitForCondition(() => ({ status: 'OK' }))
    expect(res).to.deep.equal({ status: 'OK' })
  })

  it('should resolve on promise condition success', async () => {
    const res = await waitForCondition(async () => ({ status: 'OK' }))
    expect(res).to.deep.equal({ status: 'OK' })
  })

  it('should wait some time between checks', async () => {
    let iterations = 0
    const start = Date.now()
    const res = await waitForCondition(() => {
      iterations++
      return Date.now() - start > 500
    }, { intervalMs: 250 })
    expect(res).to.deep.equal(true)
    expect(iterations).to.deep.equal(2)
  })

  it('should timeout after some time', async () => {
    const res = await waitForCondition(() => false, { timeoutMs: 200 }).catch(err => err)

    expect(res).to.be.instanceOf(PromiseTimeoutError)
    expect(res.message).to.be.equal('condition did not happen after 200ms')
  })
})
