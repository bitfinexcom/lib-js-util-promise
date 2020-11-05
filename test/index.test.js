'use strict'

const promiseSleepTests = require('./promise-sleep.test')
const promiseTimeoutTests = require('./promise-timeout.test')

describe('*** Unit testing! ***', () => {
  promiseSleepTests()
  promiseTimeoutTests()
})
