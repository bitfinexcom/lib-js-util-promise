'use strict'

/* eslint-env mocha */

const chai = require('chai')
  .use(require('dirty-chai'))
  .use(require('chai-as-promised'))
const { expect } = chai
const { resolvePromiseCb } = require('../')

describe('resolvePromiseCb tests', () => {
  it('should handle callback errors', (done) => {
    resolvePromiseCb(new Error('foo'), null, (err) => {
      expect(err.message).to.be.equal('foo')
      done()
    })
  })

  it('should handle promise rejections', async () => {
    await expect(resolvePromiseCb(new Error('foo'))).to.be.rejectedWith('foo')
  })

  it('should handle callback results', (done) => {
    resolvePromiseCb(null, 'foo', (err, res) => {
      expect(err).to.be.null()
      expect(res).to.be.equal('foo')
      done()
    })
  })

  it('should handle promise resolves', async () => {
    const res = await resolvePromiseCb(null, 'foo')
    expect(res).to.be.equal('foo')
  })
})
