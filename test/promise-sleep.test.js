'use strict'

const chai = require('chai')
  .use(require('dirty-chai'))
const { expect } = chai
const { promiseSleep } = require('../')

module.exports = () => {
  describe('promise-sleep tests', () => {
    it('promiseSleep - it should resolve after around 2000 ms', async () => {
      const ts1 = Date.now()
      await promiseSleep(1000)
      const ts2 = Date.now()

      expect(/^10\d\d$/.test((ts2 - ts1).toString())).to.be.true() // 10xx ms
    }).timeout(5000)

    it('promiseSleep - it should resolve with specific value if specified', async () => {
      const ts1 = Date.now()
      const res = await promiseSleep(1000, 21)
      const ts2 = Date.now()

      expect(/^10\d\d$/.test((ts2 - ts1).toString())).to.be.true() // 10xx ms
      expect(res).to.be.equal(21)
    }).timeout(5000)
  })
}
